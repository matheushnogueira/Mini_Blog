import styles from "./styles.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/authContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {
   const { id } = useParams();
   const { document: post } = useFetchDocument("posts", id)

   const [title, setTitle] = useState("");
   const [image, setImage] = useState("");
   const [body, setBody] = useState("");
   const [tags, setTags] = useState([]);
   const [formError, setFormError] = useState("");

   useEffect(() => {
      if(post){
         setTitle(post.title);
         setBody(post.body);
         setImage(post.image);

         const textTags = post.tagsArray.join(",");
         setTags(textTags);
      }
   }, [post])
   

   const { user } = useAuthValue();

   const { updateDocument, response } = useUpdateDocument("posts");

   const navigate = useNavigate()

  const handleSubmit = (e) => {
   e.preventDefault();
      setFormError("");

   // check values
   if( !title || !image || !tags || !body ){
      return setFormError("Por favor, preencha todos os campos");
   }
   // validate image
   try{
      new URL(image)
   }catch (error) {
      return setFormError("A imagem precisa ser uma URL")   
   }
   // create tags array
   const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

   const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    }

   updateDocument(id, data);

    // redirect to home page
    navigate("/dashboard")
  };

   return (
      <div className={styles.editPost}>
         {post && (
            <>
               <h2>Editando o post: <p>{post.title}</p></h2>
               <p>Altere os dados do post</p>
               <form onSubmit={handleSubmit}>
               <label>
                  <span>Título:</span>
                  <input
                     type="text"
                     name="text"
                     placeholder="Pense num bom título..."
                     onChange={(e) => setTitle(e.target.value)}
                     value={title}
                  />
               </label>
               <label>
                  <span>URL da imagem:</span>
                  <input
                     type="text"
                     name="image"
                     placeholder="Insira uma imagem que representa seu post"
                     onChange={(e) => setImage(e.target.value)}
                     value={image}
                  />
               </label>
               <p className={styles.preview_title}>Preview da imagem atual</p>
               <img 
                  className={styles.image_preview} 
                  src={post.image} 
                  alt={post.title}
               />
               <label>
                  <span>Conteúdo:</span>
                  <textarea
                     name="body"
                     placeholder="Insira o conteúdo do post"
                     onChange={(e) => setBody(e.target.value)}
                     value={body}
                  ></textarea>
               </label>
               <label>
                  <span>Tags:</span>
                  <input
                     type="text"
                     name="tags"
                     placeholder="Insira as tags separadas por vírgula"
                     onChange={(e) => setTags(e.target.value)}
                     value={tags}
                  />
               </label>
               {!response.loading && <button className="btn">Editar</button>}
               {response.loading && <button className="btn" disabled>Aguarde.. .</button>}
               {response.error && <p className="error">{response.error}</p>}
               {formError && <p className="error">{formError}</p>}
               </form>
            </>
         )}
      </div>
   );
};

export default EditPost;