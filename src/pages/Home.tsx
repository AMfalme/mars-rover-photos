import PhotoListItem from "../components/PhotoListItem";
import React, { useState } from "react";
import {
  Photo,
  getPhotosFromApi,
  dateToShortFormat,
} from "../data/mars-photos";
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
} from "@ionic/react";
import "./Home.css";

const Home: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>();
  const [date, setDate] = useState<String>("2015-6-3");
  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const pics = (selectedDate: String) =>
    getPhotosFromApi(selectedDate)
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
    pics("2015-6-3");
  });

  const onSelectDate = (e: any) => {
    const stringDate = new Date(e);
    const newDate = dateToShortFormat(stringDate);
    console.log(e);
    console.log("dateChanged");
    setDate(newDate);
    pics(newDate);
  };

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
          value="2015-6-3"
          display-timezone="utc"
          onIonChange={(e) => onSelectDate(e.detail.value!)}
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
