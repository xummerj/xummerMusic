package com.xummermusic;
import android.util.Log;
import android.view.View;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;



/**
 * Created by xummer on 2016/3/16 0016.
 */
class ReactSpectrumManager extends SimpleViewManager<View>{
    public static final String REACT_CLASS = "RCTCanvasView";
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    private SpectrumView spectrum;

    @Override
    protected View createViewInstance(ThemedReactContext reactContext) {
//        Canvas canvas= new Canvas();
//        Paint paint = new Paint();
//        paint.setColor(Color.RED);
//        paint.setShadowLayer(2, 3, 3, Color.rgb(180, 180, 180));
//        canvas.drawRect(40, 40, 200, 100, paint);
       Log.e("xummer  ", "createViewInstance: xummer");
        spectrum = new SpectrumView(reactContext);
        return spectrum;
    }

    @ReactProp(name="fft")
    public void setFft(SpectrumView s, ReadableArray fft){
        Log.d("xummer", "setV: fft");
        int[] ffts=new int[fft.size()];
        for(int i=0;i<fft.size();i++){
            ffts[i] = fft.getInt(i);
        }
        spectrum.updateVisualizer(ffts);
    }


}
