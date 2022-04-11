import { useState } from "react"

const CommentForm = ({ 
    handleSubmit, 
    submitLabel, 
    hasCancelButton = false, 
    initialText = '', 
    handleCancel,
}: any) => {
    const [text, setText] = useState(initialText);
    const isTextAreaDisabled = text.length === 0
    const onSubmit = (event: any) => {
        event.preventDefault()
        handleSubmit(text)
        setText('')
    }
    return (
        <form onSubmit={onSubmit} style={{marginBottom: '20px'}}>
            <textarea
            style={{marginBottom: '7px'}}
                className="comment-form-textarea form-control"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder='Agrega una nota'
            />
            <button className="comment-form-button btn btn-primary btn-sm" disabled={isTextAreaDisabled} >{submitLabel}</button>
            {hasCancelButton && (
                <button
                style={{marginLeft: '3px'}}
                    type="button"
                    className="comment-form-button comment-form-cancel-buton btn btn-secondary btn-sm"
                    onClick={handleCancel}
                >
                    Cancelar
                </button>
            )}
        </form>
    )
}

export default CommentForm