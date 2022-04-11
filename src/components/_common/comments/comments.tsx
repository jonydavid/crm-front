import { useEffect, useState } from "react"
import axios from "axios";
import Comment from './comment'
import CommentForm from "./commentForm"

import {
    deleteComment as deleteCommentApi,
    updateComment as updateCommentApi,
} from "./notes_api"
import { createNote } from "services/notesService";

const baseURLE = "https://localhost:5001/v1/api/Notes";


const Comments = ({ currentUserId }: any) => {
    const [backendComments, setBackendComments] = useState([])
    const [activeComment, setActiveComment] = useState(null)
    const rootComments = backendComments
    const addComment = async (text: any) => {
        await createNote(text, 2, 'Case')
        axios.get("https://localhost:5001/v1/api/Cases/2/details").then((response) => {
            setBackendComments(response.data.notes)
        });
    }
    const deleteComment = (Id: any) => {
        if (window.confirm('¿Está seguro de que desea eliminar la nota?')) {
            deleteCommentApi().then(() => {
                const updateBackendComments = backendComments.filter(
                    (backendComment) => backendComment.id !== Id
                )
                setBackendComments(updateBackendComments)
                console.log(`${baseURLE}/${Id})`)
                axios
                    .delete(`${baseURLE}/${Id}`)
            })
        }
    }

    const updateComment = (text: any, Id: any) => {
        console.log(`${baseURLE}/${Id})`)
        axios
            .put(`${baseURLE}/${Id}`, {
                Body: text
            })
            .then((response) => {
                console.log(response.data);
            });
        updateCommentApi(text).then(() => {
            const updatedtBackendComments = backendComments.map((backendComment) => {
                if (backendComment.id === Id) {
                    return { ...backendComment, body: text }
                }
                return backendComment
            })
            setBackendComments(updatedtBackendComments)
            console.log('setBackendComments', setBackendComments)
            setActiveComment(null)
        })
    }

    useEffect(() => {
        axios.get("https://localhost:5001/v1/api/Cases/2/details").then((response) => {
            setBackendComments(response.data.notes)
        });
    }, []);

    return (
        <div className="comments">
            <CommentForm submitLabel='Guardar' handleSubmit={addComment} />
            <div className="comments-container">
                {backendComments.map((rootComment) => (
                    <Comment
                        key={rootComment.id}
                        comment={rootComment}
                        currentUserId={currentUserId}
                        deleteComment={deleteComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        updateComment={updateComment}
                    />
                ))}
            </div>
        </div>
    )
}

export default Comments