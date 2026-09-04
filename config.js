// config.js
const SUPABASE_URL = 'https://xgikhdhjlqbhnvhyxiyb.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE'; // <--- Replace this!

window.addEventListener('DOMContentLoaded', () => {
    if (typeof window.supabase !== 'undefined') {
        window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } else {
        console.error("Supabase Library failed to load!");
    }
});

// Helper to check if the current user is an Admin
async function isAdmin() {
    const { data: { user } } = await window.supabaseClient.auth.getUser();
    if (!user) return false;
    
    const { data: profile } = await window.supabaseClient
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
        
    return profile?.role === 'admin';
}

// Helper to get the current logged-in user's profile
async function getCurrentUserProfile() {
    const { data: { user } } = await window.supabaseClient.auth.getUser();
    if (!user) return null;
    
    const { data: profile } = await window.supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
    return profile;
}