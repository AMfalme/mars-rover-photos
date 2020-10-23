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
const api = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3"
const nasa_api : string = "https://api.nasa.gov/mars-photos/api/v1"
const heroku_nasa_api = "https://mars-photos.herokuapp.com/api/v1/rovers/curiosity/"
const photos_url = "/rovers/curiosity/photos"
const api_key = "9QrwGIrIhZ6qv4zxfELJ41ZHcLWE90xtdffHBrQm"

let dateChosen = "2015-6-3"


// This section returns a promise which does not seem to be returning expected values



function getPhotosFromApi() {
      return axios({
        method: 'get',
        url: heroku_nasa_api,
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

export function getPhotos(){
    return getPhotosFromApi().then(resp => resp.data)
    .catch(error => {
        if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
            console.log("response error\\\\\\\\\\")
          } else if (error.request) {
            console.log(`No response received: ${error.request}`)
            console.log(error.request.status)
            console.log(error.request.statusText)
          } else {
            console.log(`Error setting up request: ${error.message}`)
          }
          console.log(`Config: ${error.config}`)
      return Promise.reject(error)
    })
}

// export const getPhoto = getPhotosFromApi(id: number) => getPhotos.find(p => p.id === id)




// We try to use a different approach where minimalistic approach