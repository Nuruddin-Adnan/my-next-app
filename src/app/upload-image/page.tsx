'use client'

import React, { useState } from 'react'

export default function UploadImage() {
    const [imageFile, setImageFile] = useState(null);

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();

        // Add JSON data
        const jsonData = {
            key1: 'value1',
            key2: 'value2',
        };

        formData.append('data', JSON.stringify(jsonData));

        // Add image file
        formData.append('image', imageFile!);


        // Make the fetch request
        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/file-upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label >Name:</label>
                    <input type="text" name="name" />
                </div> <br />
                <div>
                    <label>image</label>
                    <input type="file" name="image" onChange={handleFileChange} required />
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
