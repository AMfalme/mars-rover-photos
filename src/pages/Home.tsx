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
  useIonViewDidLeave,
  useIonViewDidEnter,
} from "@ionic/react";
import "./Home.css";
dateToShortFormat(new Date());
const Home: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>();
  const [date, setDate] = useState<string>(dateToShortFormat(new Date()));

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
          console.log("fetched photos");
          setPhotos(images.photos);
          console.log(date);
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

  useIonViewDidEnter(() => {
    pics(date);
  }, []);

  const onSelectDate = (e: any) => {
    const stringDate = new Date(e.detail.value);
    console.log(stringDate);
    const newDate = dateToShortFormat(stringDate);
    console.log(e);
    console.log(newDate);
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
          value={date}
          displayTimezone="utc"
          onIonChange={(e) => onSelectDate(e)}
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
