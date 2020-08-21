import React, { Component } from 'react';

class FileInput extends Component {
    constructor(props) {
        super(props);

    }

     openFile(event) {
        var input = event.target;

        var reader = new FileReader();
        reader.onload = function(){
            var text = reader.result;
            console.log(reader.result.substring(0, 200));
        };

        reader.readAsText(input.files[0]);

        console.log(input.files[0]);
        console.log(JSON.parse(input.files[0]));
        console.log(input.files[0].scenarios);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Upload file:
                    <input type='file'  onClick={''}  onChange={(e)=>this.openFile(e)} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        );
    }
}


export default FileInput;

