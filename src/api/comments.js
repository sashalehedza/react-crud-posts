import axios from 'axios'

const commentsUrl = '/comments'

export const getCommentsRequest = async (annId) => {
  return await axios.get(`${commentsUrl}/?postId=${annId}`)
}

export const addCommentRequest = async (comment) => {
  return await axios.post(`${commentsUrl}`, comment)
}

export const deleteCommentRequest = async (id) => {
  return await axios.delete(`${commentsUrl}/${id}`)
}
