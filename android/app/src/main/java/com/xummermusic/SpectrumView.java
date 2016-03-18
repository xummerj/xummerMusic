package com.xummermusic;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.LinearGradient;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.Shader;
import android.util.Log;
import android.view.View;
/**
 * Created by xummer on 2016/3/16 0016.
 */
class SpectrumView extends View {

        private int[] mBytes;
        private int[] tBytes;
        private float[] mPoints;
        private float[] tPoints;
        private int drawNum = 0;
        private Rect mRect = new Rect();

        private Paint mForePaint = new Paint();
        private Paint tForePaint = new Paint();
        private int mSpectrumNum = 48;
        private float SpectrumWidth = 8f;
        private int[] obytes = new int[mSpectrumNum];
        private boolean mFirst = true;

        public SpectrumView(Context context)
        {
            super(context);

        }

        private void init()
        {
            mBytes = null;
            mForePaint.setStrokeWidth(SpectrumWidth);
            mForePaint.setAntiAlias(true);
            int height = Math.round(getHeight());
            Shader mShader = new LinearGradient(0,0,0,height,new int[] {Color.argb(255,255,0,0),Color.argb(255,255,255,0),Color.argb(255,0,255,0)},null, Shader.TileMode.REPEAT);
            mForePaint.setShader(mShader);
            tForePaint.setStrokeWidth(8f);
            tForePaint.setAntiAlias(true);
            tForePaint.setColor(Color.rgb(255, 255, 255));
            mRect.set(0, 0, getWidth(), getHeight());
            //mForePaint.setColor(Color.rgb(0, 128, 255));
        }

        public void updateVisualizer(int[] fft)
        {
            if(fft.length<1){
                return;
            }
            mBytes =  fft;
            tBytes =  fft;
            invalidate();
        }
        public void setSpectrumNum(int num){
            mSpectrumNum = num;
            //invalidate();
        }
        public void setSpectrumWidth(int num){
            SpectrumWidth = num;
            //invalidate();
        }

        @Override
        protected void onDraw(Canvas canvas)
        {
            super.onDraw(canvas);

            if(mFirst )
            {
                // mInfoView.setText(mInfoView.getText().toString() + "\nCaptureSize: " + fft.length);
                init();
                mFirst = false;

            }
            if (mBytes == null)
            {
                return;
            }

            if (mPoints == null || mPoints.length < mBytes.length * 4)
            {
                mPoints = new float[mBytes.length * 4];
                tPoints = new float[mBytes.length * 4];
            }



            //绘制波形
            // for (int i = 0; i < mBytes.length - 1; i++) {
            // mPoints[i * 4] = mRect.width() * i / (mBytes.length - 1);
            // mPoints[i * 4 + 1] = mRect.height() / 2
            // + ((byte) (mBytes[i] + 128)) * (mRect.height() / 2) / 128;
            // mPoints[i * 4 + 2] = mRect.width() * (i + 1) / (mBytes.length - 1);
            // mPoints[i * 4 + 3] = mRect.height() / 2
            // + ((byte) (mBytes[i + 1] + 128)) * (mRect.height() / 2) / 128;
            // }

            //绘制频谱
            final int baseX = mRect.width()/mSpectrumNum;
            final int height = mRect.height();




            for (int i = 0; i < mSpectrumNum ; i++)
            {
                if (mBytes[i] < 0)
                {
                    mBytes[i] = 127;
                }

                final int xi  = baseX*i + 1;
                float mHeight = height - (float) ((mBytes[i]/127.0)*height);

                if(drawNum>0 && mBytes[i] < obytes[i]){
                    float tHeight= height - (float) ((--obytes[i]/127.0)*height);
                    tPoints[i * 4] = xi;
                    tPoints[i * 4 + 1] = tHeight;
                    tPoints[i * 4 + 2] = xi;
                    tPoints[i * 4 + 3] = tHeight - 3;
                    --obytes[i];
                }else{
                    tPoints[i * 4] = xi;
                    tPoints[i * 4 + 1] = mHeight;
                    tPoints[i * 4 + 2] = xi;
                    tPoints[i * 4 + 3] = mHeight - 3;
                    obytes[i] = mBytes[i];
                }

                mPoints[i * 4] = xi;
                mPoints[i * 4 + 1] = height;
                mPoints[i * 4 + 2] = xi;
                mPoints[i * 4 + 3] = mHeight + 4;

            }

            drawNum++;

           // Log.d("xummer", "onDraw: canvas");
            canvas.drawLines(mPoints, mForePaint);
            canvas.drawLines(tPoints, tForePaint);
        }
}
