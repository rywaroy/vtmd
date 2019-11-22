# components-basic-CertificateUpload 

<vtmd-file-box filename="index.js"><vtmd-head2 content="state"/> 

<vtmd-block> 
<vtmd-props
  name="previewVisible" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="previewImage" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="fileList" 
/> 

</vtmd-block>

<vtmd-head2 content="props"/> 

<vtmd-block> 
<vtmd-props
  name="value" 
  type="string" 
/> 

<vtmd-notes 
 txt=" 值"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="disabled" 
  type="bool" 
/> 

<vtmd-notes 
 txt=" 是否可以删除重新上传"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="size" 
  type="string" 
  defaultProps="large" 
/> 

<vtmd-notes 
 txt=" 上传组件的大小，有large\small，默认large"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="hideUploadButton" 
  type="bool" 
/> 

<vtmd-notes 
 txt=" 是否隐藏上传按钮，默认否"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="maxFileList" 
  type="number" 
  defaultProps="1" 
/> 

<vtmd-notes 
 txt=" 最多可上传几张图片，默认1张"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="action" 
  type="string" 
/> 

<vtmd-notes 
 txt=" 上传请求url地址，已有默认配置"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="accept" 
  type="string" 
  defaultProps=".jpg,.png" 
/> 

<vtmd-notes 
 txt=" 接收上传文件的格式，默认.jpg,.png"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="onChange" 
  type="func" 
/> 

<vtmd-notes 
 txt=" 值变更的change钩子"
/> 

 

</vtmd-block>

<vtmd-head2 content="methods"/> 

<vtmd-block> 
<vtmd-method-name
  name="handleCancel" 
/> 

<vtmd-notes 
 txt=" 关闭预览图片"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="handlePreview" 
/> 

<vtmd-notes 
 txt=" 预览"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="handleSuccess" 
/> 

<vtmd-notes 
 txt=" 上传成功"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="handleRemove" 
/> 

<vtmd-notes 
 txt=" 移除"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="handleBeforeUpload" 
/> 

<vtmd-notes 
 txt=" 上传文件之前的钩子"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="transferValueToArray" 
/> 

<vtmd-notes 
 txt=" 转化外部的值为数组"
/> 

 

</vtmd-block>

</vtmd-file-box>

