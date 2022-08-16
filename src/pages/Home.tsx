/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Row, Col, Affix, Button } from 'antd'
import Post from 'components/post';
import MainLayout from 'layouts/MainLayout';
import { PlusCircleOutlined } from '@ant-design/icons';
import AddPost from 'components/addPost';
import { supabase } from 'configs/supabase';
import { useStores } from 'store'


const Home = () => {
  const [openDialog, setDialog] = useState(false)
  const [triggered, setTriggered] = useState(false)
  const { globalStore } = useStores()

  const getPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        user_profiles (
          id,
          auth_id,
          email,
          display_photo,
          full_name
        ),
        content,
        filename,
        created_at,
        likes
      `)
      .order(
        'created_at', 
        { 
          ascending: false 
        }
      )

    if (error?.message) {
      console.log('ERR IN GETTING POST: ', error);
    }

    const finalPosts = [];
    if (data?.length) {
      for (const post of data) {
        const attachment_url = post.filename ? supabase.storage.from('posts').getPublicUrl(post.filename).publicURL : ''
        const user = { ...post.user_profiles }
        const likes = post.likes || []
        finalPosts.push({
          ...post,
          user,
          attachment_url,
          likes
        })
      }
      globalStore.setPosts([...finalPosts])
    }
  }

  useEffect(() => {
    let postsListener: any;
    if (!triggered) {
      setTriggered(true)
      console.log('getting posts...')
      postsListener = supabase.from('posts')
        .on('*', async (payload) => {
          console.log('POSTS CHANGE: ', payload)

          switch (payload.eventType) {
            case 'INSERT': {
              const post = { 
                ...payload.new,
                likes: payload.new.likes || []
              };
    
              const user = await supabase
                .from('user_profiles')
                .select(`*`)
                .eq('id', post.user_id);
              
              post.user = user?.data?.length ? { ...user?.data[0] } : { }
              post.attachment_url = post.filename ? supabase.storage.from('posts').getPublicUrl(post.filename).publicURL : ''

              globalStore.addPost(post)
              break
            }

            case 'UPDATE': {
              const post = { 
                ...payload.new,
                likes: payload.new.likes || []
              };
    
              const user = await supabase
                .from('user_profiles')
                .select(`*`)
                .eq('id', post.user_id);
              
              post.user = user?.data?.length ? { ...user?.data[0] } : { }
              post.attachment_url = post.filename ? supabase.storage.from('posts').getPublicUrl(post.filename).publicURL : ''

              globalStore.updatePost(post)
              break
            }

            case 'DELETE': {
              globalStore.removePost(payload.old.id)
              break
            }
          }
        })
        .subscribe()
      
      if (!globalStore.posts.length) {
        getPosts()
      }
    }

    return () => {
      supabase.removeSubscription(postsListener)
    }
  }, [])

  return (
    <MainLayout>
      <Row
        align="top"
        justify="center"
      >
        {
          globalStore.posts.map(post => (
            <Col 
              span={13}
              key={post.id}
              style={{ 
                marginTop: 10, 
                marginBottom: 10 
              }}
            >
              <Post
                {...post}
              />
            </Col>
          ))
        }
      </Row>
      <Affix
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20
        }}
      >
        <Button 
          type="primary" 
          icon={<PlusCircleOutlined height={50} width={50} />}  
          shape="circle" 
          style={{
            width: 60,
            height: 60
          }}
          onClick={() => setDialog(true)}
        />
      </Affix>
      <AddPost
        open={openDialog}
        onClose={() => setDialog(false)}
      />
    </MainLayout>
  )
}

export default observer(Home)