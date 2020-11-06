import axios from 'axios'
export type Photo  = {
    id: number
    sol: number
    camera : {
        id: number
        name: string
        rover_id: number
        full_name: string
    }
    img_src: string
    earth_date: string
    rover: {
        id: number
        name: string
        landing_date: string
        launch_date: string
        status: string
    }
}

// import Constants from '../constants'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const nasa_mars_rover_api : string = "https://api.nasa.gov/mars-photos/api/v1"
const heroku_nasa_mars_rover_api = "https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/photos"

export const dateToShortFormat = function (date: Date) {
    let day = date.getDate();
  
    let monthIndex = date.getMonth();
  
    let year = date.getFullYear();
    const selectedDate = `${year}-${monthIndex}-${day}` 
    console.log(selectedDate)
    return selectedDate;
  };

let dateChosen = dateToShortFormat(new Date())


// This section returns a promise which does not seem to be returning expected values



export function getPhotosFromApi() {
      return axios({
        method: 'get',
        url: heroku_nasa_mars_rover_api,
        responseType: 'json',
        params: {
            earth_date: dateChosen
        },
        headers: {
            'x-auth-token': 'DEMO_KEY',
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
      })
      

    }


// export const getPhoto = getPhotosFromApi(id: number) => getPhotos.find(p => p.id === id)




// We try to use a different approach where minimalistic approach