# Frontend-Backend Connection Test Guide

## 🧪 Testing the Connection

Follow these steps to verify that your frontend and backend are properly connected:

### 1. Start Both Servers

```bash
# From the root directory
npm start
```

This should start:
- Backend server on http://localhost:5000
- Frontend server on http://localhost:3000

### 2. Test Backend Health Check

Open your browser and navigate to:
```
http://localhost:5000
```

You should see a JSON response like:
```json
{
  "success": true,
  "message": "Seat Reservation API is running",
  "server_time": "2024-01-01T12:00:00.000Z",
  "version": "1.0.0"
}
```

### 3. Test Database Connection

Navigate to:
```
http://localhost:5000/api/test/test-db
```

You should see:
```json
{
  "success": true,
  "server_time": "2024-01-01 12:00:00"
}
```

### 4. Test Frontend-Backend Communication

1. Open http://localhost:3000 in your browser
2. Go to the Register page
3. Try to register a new user
4. Check the browser's Network tab to see if the API call is made
5. Check the backend console for logs

### 5. Test Authentication Flow

1. Register a new user
2. Try to login with the registered credentials
3. Check if the JWT token is stored in localStorage
4. Verify that subsequent API calls include the Authorization header

## 🔍 What to Look For

### Backend Console Logs
You should see logs like:
```
🚀 Server running on port 5000
📱 Frontend URL: http://localhost:3000
🔗 API Base URL: http://localhost:5000/api
✅ User registered successfully: { userId: 1, email: 'test@slt.com' }
✅ User logged in successfully: { userId: 1, email: 'test@slt.com' }
```

### Frontend Network Tab
- API calls should be made to http://localhost:5000/api/*
- CORS errors should not appear
- JWT tokens should be included in Authorization headers

### Browser Console
- No CORS errors
- Successful API responses
- JWT token stored in localStorage

## 🚨 Common Issues and Solutions

### 1. CORS Errors
**Error**: `Access to fetch at 'http://localhost:5000/api/auth/login' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Solution**: 
- Check that `FRONTEND_URL=http://localhost:3000` is set in backend `.env`
- Restart the backend server

### 2. Database Connection Error
**Error**: `Database connection failed`

**Solution**:
- Ensure MySQL is running
- Check database credentials in `.env`
- Verify database exists

### 3. Port Already in Use
**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:
- Change PORT in backend `.env` to another port (e.g., 5001)
- Update `API_BASE_URL` in frontend `api.js` accordingly

### 4. JWT Token Issues
**Error**: `Invalid token` or `Token expired`

**Solution**:
- Clear localStorage: `localStorage.clear()`
- Login again
- Check JWT_SECRET in backend `.env`

## ✅ Success Indicators

When everything is working correctly, you should see:

1. ✅ Both servers start without errors
2. ✅ Backend health check returns success
3. ✅ Database connection test passes
4. ✅ User registration works
5. ✅ User login works and stores JWT token
6. ✅ API calls include Authorization headers
7. ✅ No CORS errors in browser console
8. ✅ Backend logs show successful operations

## 🎯 Next Steps

Once the connection is verified:

1. Test all API endpoints
2. Implement error handling
3. Add loading states
4. Test on different browsers
5. Deploy to production

## 📞 Need Help?

If you encounter issues:

1. Check the browser console for errors
2. Check the backend console for logs
3. Verify all environment variables are set
4. Ensure all dependencies are installed
5. Check the README.md for detailed setup instructions
