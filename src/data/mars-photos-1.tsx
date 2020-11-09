import React, { useState } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

import {
  IonContent,
  IonHeader,
  IonDatetime,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import constants from "../constants";
import { render } from "@testing-library/react";
export type Photo = {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
};

// import Constants from '../constants'

const nasa_api: string = "https://api.nasa.gov/mars-photos/api/v1";
const photos_url = "/rovers/curiosity/photos";
const api_key = "9QrwGIrIhZ6qv4zxfELJ41ZHcLWE90xtdffHBrQm";

let dateChosen = "2015-6-3";

// This section returns a promise which does not seem to be returning expected values

const api = axios.create({
  baseURL: nasa_api,
});

const Photos: React.FC = () => {
  return (
    <IonPage id="Photos-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mars Rover Photos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mars Rover Photos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonDatetime
          value="2019-10-01T15:43:40.394Z"
          display-timezone="utc"
        ></IonDatetime>
        <IonList></IonList>
      </IonContent>
    </IonPage>
  );
};

function getPhotosFromApi() {
  return axios({
    method: "get",
    url: nasa_api,
    responseType: "json",
    params: {
      earth_date: dateChosen,
    },
    headers: {
      "x-auth-token": api_key,
      "content-type": "application/json",
    },
  });
}

export function getPhotos() {
  getPhotosFromApi()
    .then((resp) => resp.data)
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(`No response received: ${error.request}`);
      } else {
        console.log(`Error setting up request: ${error.message}`);
      }
      console.log(`Config: ${error.config}`);
      return Promise.reject(error);
    });
}

// export const getPhoto = getPhotosFromApi(id: number) => getPhotos.find(p => p.id === id)

// We try to use a different approach where minimalistic approach
