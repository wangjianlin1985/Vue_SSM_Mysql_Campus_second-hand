package com.chengxusheji.po;

import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.NotEmpty;
import org.json.JSONException;
import org.json.JSONObject;
import com.client.utils.JsonUtils;
import com.client.utils.SessionConsts;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class OldLevel {
    /*新旧程度id*/
    private Integer levelId;
    public Integer getLevelId(){
        return levelId;
    }
    public void setLevelId(Integer levelId){
        this.levelId = levelId;
    }

    /*新旧程度名称*/
    @NotEmpty(message="新旧程度名称不能为空")
    private String levelName;
    public String getLevelName() {
        return levelName;
    }
    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    @JsonIgnore
    public JSONObject getJsonObject() throws JSONException {
    	JSONObject jsonOldLevel=new JSONObject(); 
		jsonOldLevel.accumulate("levelId", this.getLevelId());
		jsonOldLevel.accumulate("levelName", this.getLevelName());
		return jsonOldLevel;
    }

    @Override
	public String toString() {
		return JsonUtils.toJson(this);
	}
}