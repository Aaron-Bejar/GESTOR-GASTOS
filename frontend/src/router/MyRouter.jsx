import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { Login } from '../pages/Login'
import { PublicRoute } from '../context/auth/PublicRoute'
import { ProtectedRoute } from '../context/auth/ProtectedRoute'
import { Layout } from '../pages/Layout'
import { HomePage } from '../pages/HomePage'
import { CategoryPage } from '../pages/CategoryPage'
import { MotionPage } from '../pages/MotionPage'
import { ReportPage } from '../pages/ReportPage'
import { AsistentePage } from '../pages/AsistentePage'
import { ConfigurationPage } from '../pages/ConfigurationPage'


export const MyRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route element={<PublicRoute redirectTo="/home" />}>
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route element={<ProtectedRoute redirectTo="/login" />}>
                    <Route element={<Layout />}>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/category" element={<CategoryPage />} />
                        <Route path="/motion" element={<MotionPage />} />
                        <Route path="/report" element={<ReportPage />} />
                        <Route path="/asistente" element={<AsistentePage />} />
                        <Route path="/configuration" element={<ConfigurationPage />} />
                        <Route path="/home" element={<HomePage />} />
                    </Route>
                </Route>
            </Routes>
        </>
    )
}
