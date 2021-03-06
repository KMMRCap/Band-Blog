/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef } from 'react'
import axios from 'axios';


// eslint-disable-next-line react/display-name
const UploadHandler = forwardRef((props, ref) => {
    const imageInputRef = useRef();
    const [createObjectURL, setCreateObjectURL] = useState(null);

    useImperativeHandle(ref, () => ({
        clearPic() {
            imageInputRef.current.value = "";
            setCreateObjectURL(null);
        }
    }))

    const showImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            setCreateObjectURL(URL.createObjectURL(img));
            uplaodImage(img)
        }
    }

    const uplaodImage = async (img) => {
        const body = new FormData();
        body.append("file", img)
        try {
            const request = await axios.post("/api/uploads/image", body)
            props.picValue(request.data.filename)
        } catch (error) {
            console.log(error)
        }
    }

    ///////EDIT 
    useEffect(() => {
        if (props.prevImage) {
            setCreateObjectURL(`/images/venues/${props.prevImage}`)
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    ///////END EDIT 

    return (
        <div className="file-uploader">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={createObjectURL} />
            <div className="form-group mt-2">
                <input
                    type="file"
                    name="myImage"
                    ref={imageInputRef}
                    onChange={showImage}
                />
            </div>
        </div>
    )

})

export default UploadHandler;