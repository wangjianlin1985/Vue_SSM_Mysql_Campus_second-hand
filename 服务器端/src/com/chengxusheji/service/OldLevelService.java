package com.chengxusheji.service;

import java.util.ArrayList;
import javax.annotation.Resource; 
import org.springframework.stereotype.Service;
import com.chengxusheji.po.OldLevel;

import com.chengxusheji.mapper.OldLevelMapper;
@Service
public class OldLevelService {

	@Resource OldLevelMapper oldLevelMapper;
    /*每页显示记录数目*/
    private int rows = 10;;
    public int getRows() {
		return rows;
	}
	public void setRows(int rows) {
		this.rows = rows;
	}

    /*保存查询后总的页数*/
    private int totalPage;
    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }
    public int getTotalPage() {
        return totalPage;
    }

    /*保存查询到的总记录数*/
    private int recordNumber;
    public void setRecordNumber(int recordNumber) {
        this.recordNumber = recordNumber;
    }
    public int getRecordNumber() {
        return recordNumber;
    }

    /*添加新旧程度记录*/
    public void addOldLevel(OldLevel oldLevel) throws Exception {
    	oldLevelMapper.addOldLevel(oldLevel);
    }

    /*按照查询条件分页查询新旧程度记录*/
    public ArrayList<OldLevel> queryOldLevel(int currentPage) throws Exception { 
     	String where = "where 1=1";
    	int startIndex = (currentPage-1) * this.rows;
    	return oldLevelMapper.queryOldLevel(where, startIndex, this.rows);
    }

    /*按照查询条件查询所有记录*/
    public ArrayList<OldLevel> queryOldLevel() throws Exception  { 
     	String where = "where 1=1";
    	return oldLevelMapper.queryOldLevelList(where);
    }

    /*查询所有新旧程度记录*/
    public ArrayList<OldLevel> queryAllOldLevel()  throws Exception {
        return oldLevelMapper.queryOldLevelList("where 1=1");
    }

    /*当前查询条件下计算总的页数和记录数*/
    public void queryTotalPageAndRecordNumber() throws Exception {
     	String where = "where 1=1";
        recordNumber = oldLevelMapper.queryOldLevelCount(where);
        int mod = recordNumber % this.rows;
        totalPage = recordNumber / this.rows;
        if(mod != 0) totalPage++;
    }

    /*根据主键获取新旧程度记录*/
    public OldLevel getOldLevel(int levelId) throws Exception  {
        OldLevel oldLevel = oldLevelMapper.getOldLevel(levelId);
        return oldLevel;
    }

    /*更新新旧程度记录*/
    public void updateOldLevel(OldLevel oldLevel) throws Exception {
        oldLevelMapper.updateOldLevel(oldLevel);
    }

    /*删除一条新旧程度记录*/
    public void deleteOldLevel (int levelId) throws Exception {
        oldLevelMapper.deleteOldLevel(levelId);
    }

    /*删除多条新旧程度信息*/
    public int deleteOldLevels (String levelIds) throws Exception {
    	String _levelIds[] = levelIds.split(",");
    	for(String _levelId: _levelIds) {
    		oldLevelMapper.deleteOldLevel(Integer.parseInt(_levelId));
    	}
    	return _levelIds.length;
    }
}
