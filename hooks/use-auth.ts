import { useState, useEffect } from "react"
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { getPartnerByUid, createPartner } from "@/lib/firestore-helpers"
import type { Partner } from "@/lib/types"

interface AuthState {
    user: User | null
    partner: Partner | null
    loading: boolean
    error: string | null
}

export function useAuth() {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        partner: null,
        loading: true,
        error: null,
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in, fetch partner data
                try {
                    const partner = await getPartnerByUid(user.uid)
                    setAuthState({
                        user,
                        partner,
                        loading: false,
                        error: partner ? null : "Partner profile not found",
                    })
                } catch (error) {
                    console.error("Error fetching partner:", error)
                    setAuthState({
                        user,
                        partner: null,
                        loading: false,
                        error: "Failed to load partner profile",
                    })
                }
            } else {
                // User is signed out
                setAuthState({
                    user: null,
                    partner: null,
                    loading: false,
                    error: null,
                })
            }
        })

        return () => unsubscribe()
    }, [])

    const login = async (email: string, password: string) => {
        try {
            setAuthState((prev) => ({ ...prev, loading: true, error: null }))
            await signInWithEmailAndPassword(auth, email, password)
            // Auth state change will be handled by the listener
        } catch (error: any) {
            setAuthState((prev) => ({
                ...prev,
                loading: false,
                error: error.message || "Failed to sign in",
            }))
            throw error
        }
    }

    const register = async (
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        phone: string,
        additionalData?: { address?: string; country?: string; region?: string }
    ) => {
        try {
            setAuthState((prev) => ({ ...prev, loading: true, error: null }))

            // Create Firebase Auth user
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            // Build partner data
            const partnerData: Omit<Partner, "id" | "uid"> = {
                firstName,
                lastName,
                email,
                phone,
                address: additionalData?.address || "",
                country: additionalData?.country || "",
                region: additionalData?.region || "",
                rank: "Bronze",
                score: 0,
                status: "active",
                createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 },
            }

            // Create partner profile in Firestore
            await createPartner(userCredential.user.uid, partnerData)

            // Auth state change will be handled by the listener
        } catch (error: any) {
            setAuthState((prev) => ({
                ...prev,
                loading: false,
                error: error.message || "Failed to register",
            }))
            throw error
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            // Auth state change will be handled by the listener
        } catch (error: any) {
            setAuthState((prev) => ({
                ...prev,
                error: error.message || "Failed to sign out",
            }))
            throw error
        }
    }

    return {
        user: authState.user,
        partner: authState.partner,
        loading: authState.loading,
        error: authState.error,
        login,
        register,
        logout,
        isAuthenticated: !!authState.user,
    }
}
