/* eslint-disable react-hooks/exhaustive-deps */
import { supabase } from "configs/supabase"
import { IPost } from "models"
import { useState, useCallback, useEffect } from "react"
import toast from "react-hot-toast"
import { formatDateToRelative } from "utils/dateFormat"
import { IComment } from 'models/index';
import { Card, Avatar, Row, Col, Image, Button, Popconfirm } from 'antd'
import { Typography } from 'antd';
import { CommentOutlined, HeartFilled, HeartOutlined, DeleteFilled } from "@ant-design/icons"
import { useStores } from "store"
import { observer } from "mobx-react-lite"

const Post = ({ 
  user, 
  created_at, 
  content, 
  attachment_url,
  likes, 
  id 
}: IPost) => {
  const { globalStore } = useStores()
  const [currentUser] = useState(supabase.auth.user())
  const [triggered, setTriggered] = useState(false)
  const [comments, setComments] = useState<IComment[] | []>([])

  const likePost = useCallback(async () => {
    const updatedLikes = [...likes];

    if (likes.includes(currentUser?.id as string)) {
      const index = likes.indexOf(currentUser?.id as string)
      console.log('existing like: ', index, likes)
      if (index !== -1) {
        updatedLikes.splice(index, 1);
      }
    } else {
      console.log('pushing like: ', likes)
      updatedLikes.push(currentUser?.id as string);
    }

    const { error } = await supabase
      .from<IPost>('posts')
      .update({
        likes: updatedLikes
      })
      .eq('id', id)
    
    if (error?.message) {
      console.log('LIKING POST ERR: ', error?.message)
      toast.error('Something went wrong...')
    }
  }, [currentUser, likes, id])

  const deletePost = useCallback(async () => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error?.message) {
      toast.error(error?.message || 'Something went wrong, please try again later...');
    } else {
      toast.success('Post deleted!')
    }
  }, [id])

  const getComments = useCallback(async () => {
    const { data, error } = await supabase
      .from<IComment>('comments')
      .select(`
        id,
        created_at,
        content,
        attachment_url,
        user_profiles (
          id,
          email,
          auth_id,
          display_photo,
          full_name
        )
      `)
      .eq('post_id', id)
    
    if (error?.message) {
      console.log('ERR WHILE GETTING POST COMMENTS: ', error);
    } else {
      setComments(data ? [ ...data ] : [])
    }
  }, [id])

  useEffect(() => {
    if (!triggered) {
      console.log('getting comments for ', id, ' ...')
      setTriggered(true)
      getComments()
    }
  }, [])

  return (
    <Card
      style={{
        width: '100%'
      }}
    >
      <Row align="middle" justify="space-between">
        <Col span={10}>
          <Row align="middle" justify="start">
            <Col>
              <Avatar
                size={50}
                src={user.display_photo}
                alt={user.full_name}
              >
                { user?.full_name ? user?.full_name[0] : 'U' }
              </Avatar>
            </Col>
            <Col style={{ marginLeft: 9 }}>
              <Typography.Text strong>
                {user.full_name}
              </Typography.Text>
              <br/>
              <Typography.Text
                style={{
                  color: 'gray'
                }}
              >
                {formatDateToRelative(created_at)}
              </Typography.Text>
            </Col>
          </Row>
        </Col>
        {
          user.id === globalStore.user?.id &&
          <Col>
            <Popconfirm
              title="Are you sure you want to delete this post?"
              onConfirm={deletePost}
              onCancel={() => console.log('waw nice call...')}
              okText="Yes"
              cancelText="No"
            >
              <Button 
                type="text" 
                style={{
                  color: '#FF7C9B'
                }}
                icon={<DeleteFilled />} 
              />
            </Popconfirm>          
          </Col>
        }
      </Row>
      
      {
        attachment_url &&
        <Row align="middle" justify="center" style={{ marginTop: 30 }}>
          <Image
            src={attachment_url}
            width={450}
          />
        </Row>
      }

      <Row align="middle" justify="center" style={{ marginTop: 30 }}>
        <Col span={24}>
          <Typography.Text>{content}</Typography.Text>
        </Col>
      </Row>

      <Row align="middle" justify="start" style={{ marginTop: 30 }}>
        <Col span={3}>
          <Button
            type="link"
            color="primary"
            onClick={likePost}
            icon={
              likes.includes(currentUser?.id as string)
              ?
              <HeartFilled />
              :
              <HeartOutlined />
            }
          >
            <Typography.Text style={{ fontSize: 12, marginLeft: 6 }}>
            { likes.length ? likes.length : null }
            </Typography.Text>
          </Button>
        </Col>
        <Col span={2}>
          <Button
            type="text"
            color="primary"
            icon={<CommentOutlined/>} 
          />
        </Col>
      </Row>
      
    </Card>
  )
}

export default observer(Post)