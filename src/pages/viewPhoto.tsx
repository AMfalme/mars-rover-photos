import React, { useState } from "react";
import { Photo, getPhotosFromApi } from "../data/mars-photos";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonRouterOutlet,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonFab,
  IonFabButton,
  IonButton,
  IonTabButton,
  IonItem,
} from "@ionic/react";
import { bookmark, heart, heartOutline } from "ionicons/icons";
import { RouteComponentProps } from "react-router";
import "./ViewPhoto.css";
import { db, fireStore } from "../firebaseConfig";
import firebase from "firebase";
interface ViewMessageProps extends RouteComponentProps<{ id: string }> {}

const ViewPhoto: React.FC<ViewMessageProps> = ({ match }) => {
  const [photo, setPhoto] = useState<Photo>();
  const [favorite, setFavorite] = useState(false);
  const imgId = parseInt(match.params.id, 10);
  const getPic = (id: number) =>
    getPhotosFromApi()
      .then((resp) => resp.data)
      .then(
        (images) => {
          console.log(images.photos);
          const picId = parseInt(match.params.id, 10);
          const pic = images.photos.find((p: Photo) => p.id === picId);
          setPhoto(pic);
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
    getPic(imgId);
  });
  const onClickLike = () => {
    fireStore
      .collection("Photos")
      .doc(match.params.id)
      .set({ ...photo!!, likes: +1 })
      .then(function (value: void) {
        console.log("Document written with : ", value);
      })
      .catch(function (error: String) {
        console.error("Error adding document: ", error);
      });
  };
  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="Photos" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {photo ? (
        <IonContent>
          <IonCard>
            <IonImg src={photo.img_src} class="photo-size" />
            <IonCardHeader>
              <IonCardSubtitle>{photo.camera.full_name}</IonCardSubtitle>
              <IonCardTitle>{photo.rover.name}</IonCardTitle>
            </IonCardHeader>
          </IonCard>

          {/*-- Tab bar --*/}
          <IonItem slot="bottom">
            <IonButton>
              <IonIcon icon={heartOutline} />
            </IonButton>
            <IonTabButton tab="contact">
              <IonIcon icon={bookmark} />
            </IonTabButton>
          </IonItem>
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton onClick={onClickLike}>
              <IonIcon icon={favorite ? heart : heartOutline}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      ) : (
        <IonContent>
          <div>Photo not found</div>
        </IonContent>
      )}
    </IonPage>
  );
};

export default ViewPhoto;
