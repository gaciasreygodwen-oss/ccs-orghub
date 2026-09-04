
const SUPABASE_URL = "https://tlwxoifwjbjebetonlgb.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_MrQpBMvzZg6hEs94JI_LmA_TLO9x4UF";

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

// Helper to get the current logged in user's profile
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