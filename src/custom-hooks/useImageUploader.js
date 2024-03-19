import { useState } from "react";

const useImageUploader = ({ src }) => {

    const [imagePreview, setImagePreview] = useState(
      `/img/main_imges_folder/${src}`
    );

  const handleImageChange = (e) => {
    e.preventDefault();

    const imageFile = e.target.files[0];

    const imageURL = URL.createObjectURL(imageFile);
    setImagePreview(imageURL);
  };

  return {
    imagePreview,
    setImagePreview,
    handleImageChange,
  };
};

export default useImageUploader;