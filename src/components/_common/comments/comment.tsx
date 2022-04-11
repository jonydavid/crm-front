import { Row, Col } from 'react-bootstrap'
import CommentForm from './commentForm'


const Comment = ({
    comment,
    currentUserId,
    updateComment,
    deleteComment,
    activeComment,
    setActiveComment
}: any) => {
    // const fiveMinutes = 300000
    // const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes
    // const canReply = Boolean(currentUserId)
    // const canEdit = currentUserId === comment.userId
    // const canDelete = currentUserId === comment.userId
    const createdAt = new Date(comment.createdAt).toLocaleDateString()
    const isEditing = activeComment && activeComment.type === 'editing' && activeComment.id === comment.id
    return (
        <Row className="comment" style={{marginBottom: '10px'}}>
            <Col sm={2}>
                <div className="comment-image-container">
                    <img src="/userIcon.png" width="60" height="60" />
                </div>
            </Col>
            <Col>
                <div className="comment-right-part">
                    <div className="comment-content">
                        {/* <div className="comment-author">{comment.username}</div> */}
                        <div><b>{comment?.username ? comment.username : 'Usuario'}</b></div>
                        {/* <div>{createdAt}</div> */}
                    </div>
                    {!isEditing && <div className="comment-text">{comment.body}</div>}
                    {isEditing && (
                        <CommentForm
                            submitLabel='Actualizar'
                            hasCancelButton
                            initialText={comment.body}
                            handleSubmit={(text: any) => updateComment(text, comment.id)}
                            handleCancel={() => setActiveComment(null)}
                        />
                    )}
                    {/* <div className='comment-actions'>
                        {canEdit && <button className='comment-action btn btn-primary btn-sm' onClick={() =>
                            setActiveComment({ id: comment.id, type: 'editing' })}
                        >Editar</button>}
                        {canDelete && <button className='comment-action btn btn-secondary btn-sm' onClick={() => deleteComment(comment.id)}>Eliminar</button>}
                    </div> */}
                    <div className='comment-actions' style={{marginTop: '5px'}}>
                        <button style={{marginRight: '3px'}} className='comment-action btn btn-primary btn-sm' onClick={() =>
                            setActiveComment({ id: comment.id, type: 'editing' })}
                        >Editar</button>
                       <button className='comment-action btn btn-secondary btn-sm' onClick={() => deleteComment(comment.id)}>Eliminar</button>
                </div>
            </div>
        </Col>
        </Row >
    );
}

export default Comment