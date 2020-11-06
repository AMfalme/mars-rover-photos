import PhotoListItem from "../components/PhotoListItem";
import React, { useEffect, useState } from "react";
import { Photo, getPhotosFromApi } from "../data/mars-photos";
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
  IonLabel,
  IonListHeader,
  IonButton,
} from "@ionic/react";
import "./Home.css";

const Home: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>();
  const [date, setDate] = useState("2015-6-3");

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const pics = (date: String) =>
    getPhotosFromApi()
      .then((resp) => resp.data)
      .then(
        (images) => {
          setPhotos(images.photos);
        },
        (error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log("response error\\\\\\\\\\");
          } else if (error.request) {
            console.log(`No response received: ${error.request}`);
            console.log(error.request.status);
            console.log(error.request.statusText);
          } else {
            console.log(`Error setting up request: ${error.message}`);
          }
          console.log(`Config: ${error.config}`);
        }
      );

  useIonViewWillEnter(() => {
    pics(date);
  });

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mars Rover Photos </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mars Rover Photos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonDatetime
          value="2019-10-01T15:43:40.394Z"
          display-timezone="utc"
        ></IonDatetime>
        <IonContent>
          <IonList>
            {/*-- Default List Header --*/}
            <IonListHeader>
              <IonLabel>Image thumbnail</IonLabel>
              <IonLabel>Date taken</IonLabel>
              <IonLabel>Camera name</IonLabel>
              <IonLabel>Rover name</IonLabel>
            </IonListHeader>
            {photos &&
              photos.map((p) => <PhotoListItem key={p.id} photo={p} />)}
          </IonList>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Home;
