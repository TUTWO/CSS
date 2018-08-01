import React from 'react';

class Initializelayout extends React.Component{
    render(){
        let tabStyle={
            width:'100%',
            height:'120px',
            margin:'0 0 10px 0'
        };
        let mapStyle={
            width:'80%',
            height:'800px',
            background:'#DDDDDD',
            float:'right'
        };
        let leftStyle={
            width:'20%',
            height:'800px',
            background:'#31B0D5',
            float:'left'
        };
        
        return(
            <div>
                <div id='tab' style={tabStyle}></div>
                <div id='rightMap' style={mapStyle}></div>
                <div id='leftPanelDiv' style={leftStyle}></div>
            </div>
        );
    }
}

export default Initializelayout;