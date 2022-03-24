using Application.Activities;

var builder = WebApplication.CreateBuilder(args);

// add services to container
builder.Services
    .AddControllers(opt =>
    {
        var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
        opt.Filters.Add(new AuthorizeFilter(policy));
    })
    .AddFluentValidation(config =>
    {
        config.RegisterValidatorsFromAssemblyContaining<Create>();
    });

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

// Configure the http request pipeline
var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();

app.UseXContentTypeOptions();
app.UseReferrerPolicy(opt => opt.NoReferrer());
app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
app.UseXfo(opt => opt.Deny());
app.UseCspReportOnly(opt => opt
    .BlockAllMixedContent()
    .StyleSources(s => s.Self().CustomSources(
        "https://fonts.googleapis.com",
        "sha256-/epqQuRElKW1Z83z1Sg8Bs2MKi99Nrq41Z3fnS2Nrgk=",
        "sha256-2aahydUs+he2AO0g7YZuG67RGvfE9VXGbycVgIwMnBI=",
        "sha256-+oGcdj5BhO6SoiIGYIkPOMYi7d2h2Pp/bkJLBfYL+kk=",
        "sha256-edu1Wj8pInOHtaExG1rikS6rfKXO8kFXLAdOTBpHMYk=",
        "sha256-yChqzBduCCi4o4xdbXRXh4U/t1rP4UUUMJt+rB+ylUI="
    ))
    .FontSources(s => s.Self().CustomSources(
        "https://fonts.gstatic.com", "data:"
    ))
    .FormActions(s => s.Self())
    .FrameAncestors(s => s.Self())
    .ImageSources(s => s.Self().CustomSources(
        "https://res.cloudinary.com",
        "https://www.facebook.com",
        "https://platform-lookaside.fbsbx.com",
        "data:",
        "blob:"
        ))
    .ScriptSources(s => s.Self()
        .CustomSources(
            "sha256-HIgflxNtM43xg36bBIUoPTUuo+CXZ319LsTVRtsZ/VU=",
            "https://connect.facebook.net",
            "https://fonts.googleapis.com",
            "sha256-3x3EykMfFJtFd84iFKuZG0MoGAo5XdRfl3rq3r//ydA=",
            "sha256-DcL1wTPG7zzW3wpiRtWmqayS5TKCXITbA9bVcgWqAv8="))
);

if (app.Environment.IsDevelopment())
{
    // app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
}
else
{
    app.Use(async (context, next) =>
    {
        context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
        await next.Invoke();
    });
}
// app.UseHttpsRedirection();

// using wwwroot
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/chat");
app.MapFallbackToController("Index", "Fallback");

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{

    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

await app.RunAsync();
