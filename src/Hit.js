import React from 'react';

export default function Hit(props){
    return(
        
        <tr>
            <td>{props.hit.objectID}</td>
            <td>{props.hit.title}</td>
            <td>{props.hit.url}</td>
            <td>{props.hit.author}</td>
        </tr>
    )
}