import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonListHeader,
  IonLabel,
  useIonViewDidEnter,
} from "@ionic/react";
import { Photo, getSavedPhotos } from "../data/mars-photos";
import PhotoListItem, { PhotoListItemProps } from "../components/PhotoListItem";

const Favorites: React.FC<PhotoListItemProps> = () => {
  const [photos, setPhotos] = useState<any[]>();
  const [date, setDate] = useState<string>(new Date().toString());
  const [count, setCount] = useState(0);

  useIonViewDidEnter(() => {
    getSavedPhotos().then((doc) => {
      const savedPhotos: any[] = [];
      doc.forEach((p) => {
        console.log(p.data());
        savedPhotos.push(p.data());
      });
      setPhotos(savedPhotos);
    });
  });
  return (
    <IonPage id="Favorite-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mars Rover Photos </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mars Rover Photos</IonTitle>
          </IonToolbar>
        </IonHeader>

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

export default Favorites;
