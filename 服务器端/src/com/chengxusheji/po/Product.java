package com.chengxusheji.po;

import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.NotEmpty;
import org.json.JSONException;
import org.json.JSONObject;
import com.client.utils.JsonUtils;
import com.client.utils.SessionConsts;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class Product {
    /*商品id*/
    private Integer productId;
    public Integer getProductId(){
        return productId;
    }
    public void setProductId(Integer productId){
        this.productId = productId;
    }

    /*商品类别*/
    private ProductClass productClassObj;
    public ProductClass getProductClassObj() {
        return productClassObj;
    }
    public void setProductClassObj(ProductClass productClassObj) {
        this.productClassObj = productClassObj;
    }

    /*商品名称*/
    @NotEmpty(message="商品名称不能为空")
    private String productName;
    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }

    /*商品图片*/
    private String mainPhoto;
    public String getMainPhoto() {
        return mainPhoto;
    }
    public void setMainPhoto(String mainPhoto) {
        this.mainPhoto = mainPhoto;
    }

    private String mainPhotoUrl;
    public void setMainPhotoUrl(String mainPhotoUrl) {
		this.mainPhotoUrl = mainPhotoUrl;
	}
	public String getMainPhotoUrl() {
		return  SessionConsts.BASE_URL + mainPhoto;
	}
    /*新旧程度*/
    private OldLevel oldLevel;
    public OldLevel getOldLevel() {
        return oldLevel;
    }
    public void setOldLevel(OldLevel oldLevel) {
        this.oldLevel = oldLevel;
    }

    /*价格区间*/
    private PriceRegion priceRegionObj;
    public PriceRegion getPriceRegionObj() {
        return priceRegionObj;
    }
    public void setPriceRegionObj(PriceRegion priceRegionObj) {
        this.priceRegionObj = priceRegionObj;
    }

    /*商品价格*/
    @NotNull(message="必须输入商品价格")
    private Float price;
    public Float getPrice() {
        return price;
    }
    public void setPrice(Float price) {
        this.price = price;
    }

    /*所在区域*/
    private AreaInfo areaObj;
    public AreaInfo getAreaObj() {
        return areaObj;
    }
    public void setAreaObj(AreaInfo areaObj) {
        this.areaObj = areaObj;
    }

    /*商品描述*/
    @NotEmpty(message="商品描述不能为空")
    private String productDesc;
    public String getProductDesc() {
        return productDesc;
    }
    public void setProductDesc(String productDesc) {
        this.productDesc = productDesc;
    }

    /*联系人*/
    @NotEmpty(message="联系人不能为空")
    private String connectPerson;
    public String getConnectPerson() {
        return connectPerson;
    }
    public void setConnectPerson(String connectPerson) {
        this.connectPerson = connectPerson;
    }

    /*联系电话*/
    @NotEmpty(message="联系电话不能为空")
    private String connectPhone;
    public String getConnectPhone() {
        return connectPhone;
    }
    public void setConnectPhone(String connectPhone) {
        this.connectPhone = connectPhone;
    }

    /*发布人*/
    private UserInfo userObj;
    public UserInfo getUserObj() {
        return userObj;
    }
    public void setUserObj(UserInfo userObj) {
        this.userObj = userObj;
    }

    /*发布时间*/
    private String addTime;
    public String getAddTime() {
        return addTime;
    }
    public void setAddTime(String addTime) {
        this.addTime = addTime;
    }

    @JsonIgnore
    public JSONObject getJsonObject() throws JSONException {
    	JSONObject jsonProduct=new JSONObject(); 
		jsonProduct.accumulate("productId", this.getProductId());
		jsonProduct.accumulate("productClassObj", this.getProductClassObj().getClassName());
		jsonProduct.accumulate("productClassObjPri", this.getProductClassObj().getClassId());
		jsonProduct.accumulate("productName", this.getProductName());
		jsonProduct.accumulate("mainPhoto", this.getMainPhoto());
		jsonProduct.accumulate("oldLevel", this.getOldLevel().getLevelName());
		jsonProduct.accumulate("oldLevelPri", this.getOldLevel().getLevelId());
		jsonProduct.accumulate("priceRegionObj", this.getPriceRegionObj().getRegionName());
		jsonProduct.accumulate("priceRegionObjPri", this.getPriceRegionObj().getRegionId());
		jsonProduct.accumulate("price", this.getPrice());
		jsonProduct.accumulate("areaObj", this.getAreaObj().getAreaName());
		jsonProduct.accumulate("areaObjPri", this.getAreaObj().getAreaId());
		jsonProduct.accumulate("productDesc", this.getProductDesc());
		jsonProduct.accumulate("connectPerson", this.getConnectPerson());
		jsonProduct.accumulate("connectPhone", this.getConnectPhone());
		jsonProduct.accumulate("userObj", this.getUserObj().getName());
		jsonProduct.accumulate("userObjPri", this.getUserObj().getUser_name());
		jsonProduct.accumulate("addTime", this.getAddTime().length()>19?this.getAddTime().substring(0,19):this.getAddTime());
		return jsonProduct;
    }

    @Override
	public String toString() {
		return JsonUtils.toJson(this);
	}
}