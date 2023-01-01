import { useState } from 'react';


const PhotoInput = ({ register, error }) => {

    const [photoName, setPhotoName] = useState('')

    const putPhoto = (file) => {

        // Set phone name to field

        if (file === undefined) {
            setPhotoName('')
        } else {
            setPhotoName(file.name)
        }
    }


    return (
        <div className={`form__input-file ${error && 'error'}`}>
            <label className="form__file-label">
                <span>Upload</span>
                <input type="file" {...register('photo', {
                    onChange: (e) => {
                        putPhoto(e.target.files[0])
                    },
                })} />
                <div className={photoName && 'active-name'}>{photoName ? photoName : 'Upload your photo'}</div>
            </label>
            {error && <p className='error-text'>{error?.message}</p>}
        </div>

    )
}



export default PhotoInput