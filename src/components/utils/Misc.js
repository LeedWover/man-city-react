import React from 'react';
import { Link } from 'react-router-dom';

export const Tag = props => {
  
  const template = (
    <div
      style={{
        backgroundColor: props.background,
        fontSize: props.size,
        color: props.color,
        ...props.add,
        fontFamily: 'Righteous',
        display: 'inline-block',
        padding: '5px 10px'
      }}
    >{props.children}</div>
  )

  if(props.linkTo) {
    return (
      <Link to={props.linkTo}>
        {template}
      </Link>
    )
  } else {
    return template
  }
}

export const firebaseLooper = snapshot => {
  const data = [];

  snapshot.forEach((childSnapshot) => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    })
  });
  return data;
}

// export const reverseArray = actualArray => {
//   let reversedArray = [];

//   for(let i = actualArray.length - 1; i >= 0; i--) {
//     reversedArray.push(actualArray[i]);
//   }
//   return reversedArray;
// }

export const Validate = element => {
  let error = [true, ''];

  if(element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? 'Must be a valid email' : ''}`;
    error = !valid ? [valid, message] : error
  }

  if(element.validation.required) {
    const valid = element.value.trim() !== '';
    const message = `${!valid ? 'This field is required' : ''}`;
    error = !valid ? [valid, message] : error
  }

  return error;
}