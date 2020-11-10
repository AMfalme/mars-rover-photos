import React from "react";
import { IonItem, IonLabel, IonNote, IonImg, IonThumbnail } from "@ionic/react";
import { Photo } from "../data/mars-photos";
import "./MessageListItem.css";

interface PhotoListItemProps {
  photo: Photo;
}

const PhotoListItem: React.FC<PhotoListItemProps> = ({ photo }) => {
  return (
    <IonItem
      routerLink={`/photo/${photo.id}/${photo.earth_date}`}
      detail={false}
    >
      <div slot="end" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          <span className="date">
            <IonNote>{photo.earth_date}</IonNote>
          </span>
        </h2>
      </IonLabel>
      <IonThumbnail slot="start">
        <IonImg src={photo.img_src} />
      </IonThumbnail>
      <IonLabel>{photo.camera.full_name}</IonLabel>

      <IonLabel>{photo.rover.name}</IonLabel>
    </IonItem>
  );
};

export default PhotoListItem;
