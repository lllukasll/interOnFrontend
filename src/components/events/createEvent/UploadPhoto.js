import React from 'react';

class UploadPhoto extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        let imagePreviewUrl = this.props.imagePreviewUrl;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img alt="placeholder" src={imagePreviewUrl} class="new-group-img" />);
        } else {
            $imagePreview = (<img alt="group" src="/images/placeholder.png" class="new-group-img" />);
        }

        return(
            <div className="form-control"> 
                {$imagePreview}
                <div className="margin-top ">
                    <form className="choose-group-photo ">
                        <label for="file" >
                        <input
                            type="file"
                            onChange={(e)=>this.props.handleImageChange(e)} />
                        </label>
                    </form>
                </div>
            </div>
        );
    }
}

export default UploadPhoto;

