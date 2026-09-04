// config.js
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper to check if the current user is an Admin
async function isAdmin() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    const { data: profile } = await supabase
        .from('student_profiles')
        .select('role')
        .eq('id', user.id)
        .single();
        
    return profile?.role === 'admin';
}

// Helper to get the current logged-in user's profile
async function getCurrentUserProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    const { data: profile } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
    return profile;
}