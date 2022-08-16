import { useState } from 'react'
import { Button, Form, Input, Modal, Upload, message, UploadFile } from "antd";
import { observer } from 'mobx-react-lite';
import { supabase } from "configs/supabase";
import { IPost } from "models";
import toast from "react-hot-toast";
import { InboxOutlined } from '@ant-design/icons';
import { useStores } from 'store';
import { RcFile } from 'antd/lib/upload';

interface IAddPost {
  open: boolean;
  onOpen?: (p?: any) => any;
  onClose?: (p?: any) => any;
}

const AddPost = ({ open, onOpen, onClose }: IAddPost) => {
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const { globalStore } = useStores()

  const addPost = async () => {
    setIsLoading(true)

    const postResponse = await supabase
        .from<IPost>('posts')
        .insert({
          content,
          user_id: globalStore.user?.id as number,
          auth_id: supabase.auth.user()?.id
        })

    if (postResponse?.error?.message) {
      console.log('ERR WHILE ADDING POST: ', postResponse?.error);
      toast.error('Something went wrong...')
      setIsLoading(false)
      return
    }

    if (fileList.length) {
      const newPostId = postResponse?.data?.length ? postResponse?.data[0]?.id : new Date().toISOString();
      const fileToUpload = fileList[0]
      const fileExt = fileToUpload?.type?.replace('image/', '.');
      const { data, error } = await supabase
        .storage
        .from('posts')
        .upload(
          `${newPostId}${fileExt}`,
          fileToUpload as RcFile
        );
      
      if (error?.message) {
        console.log(error)
        toast.error(error?.message || 'Something went wrong, please try again later...')
        setIsLoading(false)
        return;
      }

      await supabase
        .from('posts')
        .update({ filename: data?.Key.replace('posts/', '') })
        .eq('id', newPostId)
    }

    if (onClose) {
      onClose()
    }

    setIsLoading(false);
  }

  const removeFile = (file: any) => {
    const index = fileList.indexOf(file)
    const newFileList = fileList.slice()
    newFileList.splice(index, 1)
    setFileList(newFileList)
  }

  const setFile = (file: any) => {
    console.log('SET FILE: ', file)
    setFileList([file])
  }

  return (
    <Modal
      visible={open}
      onOk={addPost}
      onCancel={onClose}
      footer={[
        <Button
          key="back"
          type="text"
          color="secondary"
          loading={isLoading}
          onClick={onClose}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          loading={isLoading}
          type="primary"
          onClick={addPost}
        >
          Post!
        </Button>
      ]}
    >
      <Form
        name="addPost"
        layout="vertical"
        wrapperCol={{ span: 24 }}
        labelCol={{ span: 24 }}
      >
        <Form.Item
          label="What's on your mind?"
          name="content"
        >
          <Input.TextArea rows={4} value={content} onChange={(e) => setContent(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Pic"
          name="attachmentUrl"
        >
          <Upload.Dragger
            accept="image/*"
            multiple={false}
            fileList={fileList}
            onRemove={removeFile}
            beforeUpload={setFile}
          >
            <InboxOutlined />
            <p>Drag your image here...</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default observer(AddPost)