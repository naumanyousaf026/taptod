import React from 'react'
import NavigationBar from '../Header'
import UserCard from './Account'
import Header from '../Header_1'
import Earnings from './Earnings'

export default function Profile() {
  return (
    <div>
        <NavigationBar />

        <Header />
     <UserCard />
     <Earnings />
    </div>
  )
}
