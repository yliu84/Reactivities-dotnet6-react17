import { makeAutoObservable, reaction, runInAction } from "mobx";
import { v4 as uuid } from 'uuid';
import {format} from 'date-fns';
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore{
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    
    constructor(){
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            a.date!.getTime() - b.date!.getTime());
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy');
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
    }

    loadActivities = async () =>{
        this.loadingInitial= true;
        try {
            const activities = await agent.Activities.list();
            
            activities.forEach(activity =>{
                // activity.date = activity.date!.toISOString().split('T')[0];
                this.activityRegistry.set(activity.id, activity);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity = (activity: Activity) => {
        // const user = store.userStore.user;
        // if (user) {
        //     activity.isGoing = activity.attendees!.some(
        //         a => a.username === user.username
        //     )
        //     activity.isHost = activity.hostUsername === user.username;
        //     activity.host = activity.attendees?.find(x => x.username === activity.hostUsername);
        // }
        // activity.date = new Date(activity.date!);
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) =>{
        this.selectedActivity = this.activityRegistry.get(id);
    }

    clearSelectedActivity = () =>{
        this.selectedActivity  = undefined;
    }

    openForm = (id?: string) =>{
        id ? this.selectActivity(id) : this.clearSelectedActivity();
        this.editMode = true;
    }

    closeForm = () =>{
        this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
        // const user = store.userStore.user;
        // const attendee = new Profile(user!);
        this.loading=true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            // const newActivity = new Activity(activity);
            // newActivity.hostUsername = user!.username;
            // newActivity.attendees = [attendee];
            // this.setActivity(newActivity);
            runInAction(() => {
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() =>{
                    this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                // if (activity.id) {
                //     let updatedActivity = {...this.getActivity(activity.id), ...activity}
                //     this.activityRegistry.set(activity.id, updatedActivity as Activity);
                //     this.selectedActivity = updatedActivity as Activity;
                // } 
                this.activityRegistry.set(activity.id,activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}
