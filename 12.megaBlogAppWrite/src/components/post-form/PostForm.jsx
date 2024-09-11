import {useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select,RTE} from '../index'
import appwriteService  from '../../appWrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
    const {register, handleSubmit, getValues, 
        setValue,watch, control} = useForm({
        defaultValues: {
            title: post?.title||'',
            slug: post?.slug||'',
            content: post?.content||'',
            status: post?.status||'',
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.userData)
   
    const submit = async (data) => {
       
        if(post){
            // edit phase
            const file = data.image[0]? 
                        await appwriteService.uploadFile(data.image[0]):null
            if(file){
                // delete prev file
                await appwriteService.deleteFile(post.featuredImage)
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
            featuredImage: file?.$id|| undefined})

            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            // new form
            const file = data.image[0]? 
                        await appwriteService.uploadFile(data.image[0]):null
            if(file){console.log(userData)
                data.featuredImage = file.$id
                const dbPost = await appwriteService.createPost({
                    ...data,
                    user: userData.$id
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && value.length > 0){
            const slug = value.trim().toLowerCase().replace(/( )+/g, '-')
            return slug            
        } else {
            return ''
        }
    },[])

    useEffect(() => {
        const subscription = watch((value,{name}) => {
            if(name === 'title'){
                setValue('slug',slugTransform(value.title,{shouldValidate: true}))
            }
        })

        return () => subscription.unsubscribe()
    },[watch,slugTransform, setValue])
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
    </div>
    <div className="w-1/3 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
        </Button>
    </div>
</form>
  )
}

export default PostForm