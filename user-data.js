// pages/api/user-data.js
import { NextResponse } from 'next/server';

// Mock database (replace with actual database logic)
let userDataStore = {};

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const month = searchParams.get('month');
    const department = searchParams.get('department');
    const user = searchParams.get('user');

    const userData = userDataStore[month]?.[department]?.[user] || {};
    return NextResponse.json(userData);
}

export async function POST(req) {
    const { month, department, user, data } = await req.json();

    if (!userDataStore[month]) userDataStore[month] = {};
    if (!userDataStore[month][department]) userDataStore[month][department] = {};
    
    userDataStore[month][department][user] = data;

    return NextResponse.json({ success: true });
}
