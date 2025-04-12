import { defineStore } from 'pinia'

export interface WayPoint {
  name: string;
  coords: {
    lat: number;
    lng: number;
  };
}

export const useWaypointStore = defineStore('waypointStore', {
  state: () => ({
    waypoints: [] as WayPoint[]
  }),
  actions: {
    addWaypoint(wp: WayPoint) {
      this.waypoints.push(wp)
    },
    removeWaypoint(index: number) {
      this.waypoints.splice(index, 1)
    },
    updateWaypoint(index: number, newName: string) {
      if (this.waypoints[index]) {
        this.waypoints[index].name = newName;
      }
    }
  }
})
