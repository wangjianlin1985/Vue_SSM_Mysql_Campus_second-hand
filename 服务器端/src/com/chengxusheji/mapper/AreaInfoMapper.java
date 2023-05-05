package com.chengxusheji.mapper;

import java.util.ArrayList;
import org.apache.ibatis.annotations.Param;
import com.chengxusheji.po.AreaInfo;

public interface AreaInfoMapper {
	/*添加所在区域信息*/
	public void addAreaInfo(AreaInfo areaInfo) throws Exception;

	/*按照查询条件分页查询所在区域记录*/
	public ArrayList<AreaInfo> queryAreaInfo(@Param("where") String where,@Param("startIndex") int startIndex,@Param("pageSize") int pageSize) throws Exception;

	/*按照查询条件查询所有所在区域记录*/
	public ArrayList<AreaInfo> queryAreaInfoList(@Param("where") String where) throws Exception;

	/*按照查询条件的所在区域记录数*/
	public int queryAreaInfoCount(@Param("where") String where) throws Exception; 

	/*根据主键查询某条所在区域记录*/
	public AreaInfo getAreaInfo(int areaId) throws Exception;

	/*更新所在区域记录*/
	public void updateAreaInfo(AreaInfo areaInfo) throws Exception;

	/*删除所在区域记录*/
	public void deleteAreaInfo(int areaId) throws Exception;

}
