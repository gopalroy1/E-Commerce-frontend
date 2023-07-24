import React from 'react'
import axios from 'axios'

const BaseUrl = axios.create({
  baseURL: ''
});


export default BaseUrl;