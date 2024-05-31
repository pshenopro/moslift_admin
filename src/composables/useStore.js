import { ref as storageRef, uploadBytes, getStorage, getDownloadURL } from 'firebase/storage'
import { initializeApp } from 'firebase/app'

import { firebaseConfig } from '../constant.js'

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export function fetchFile(file)  {
  const pathReference = storageRef(storage, `folder/${file}`);

  return getDownloadURL(pathReference).then( url => {
    return url
  })
}
