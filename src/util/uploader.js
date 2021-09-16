import request from './request'
var config = {
    createUploader(videoId, uploadAddress, uploadAuth, uploadProgress, onUploadSuccess) {
        let success = (info)=>{
            onUploadSuccess(info)
        }
        let uploader = new AliyunUpload.Vod({
            userId: "122",
            region: "cn-shenzhen",
            partSize: 1048576,
            parallel: 5,
            retryCount: 3,
            retryDuration: 2,
            /**
             * 开始上传
             */
            'onUploadstarted': function (uploadInfo) {
                console.log(uploadInfo)
                // 设置上传凭证和地址
                uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId);
            },
            //文件上传成功
            'onUploadSucceed': function (uploadInfo) {
                console.log(uploadInfo)
                success(uploadInfo)
            },
            //文件上传失败
            'onUploadFailed': function (uploadInfo, code, message) {
                console.log(uploadInfo)
            },
            //文件上传进度，单位：字节
            'onUploadProgress': function (uploadInfo, totalSize, loadedPercent) {
                uploadProgress.percentage = Math.floor(loadedPercent * 100)
            },
            //上传凭证超时
            'onUploadTokenExpired': function (uploadInfo) {
                console.log(uploadInfo)
                // 刷新上传凭证
                request.get('/uploadRequest/refresh', {
                    params:{
                        vid: videoId
                    }
                })
                .then((response)=>{
                    let result = response.data
                    if(result.code === 200){
                        // 使用刷新后的上传凭证
                        uploader.resumeUploadWithAuth(result.data.uploadAuth)
                    }
                })
            },
            //全部文件上传结束
            'onUploadEnd': function (uploadInfo) {
            }
        })
        return uploader
    }
}

export default config