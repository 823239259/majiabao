<template>
<div id="index" :style="{height:clientHeight}">
<div class="header-wrapper pc-header-new">
<div class="topbar cmn-clearfix">
<ul class="wgt-userbar wgt-userbar-n" id="j-wgt-userbar">
<li>
<a href="http://www.baidu.com/">百度首页</a>
</li>
</ul>
<div class="separator"></div>
<div class="wiki-common-headTabBar">
<a href="https://www.baidu.com/" nslog="normal" nslog-type="10600112" data-href="https://www.baidu.com/s?ie=utf-8&fr=bks0000&wd=">网页</a>
<a href="http://news.baidu.com/" nslog="normal" nslog-type="10600112" data-href="http://news.baidu.com/ns?tn=news&cl=2&rn=20&ct=1&fr=bks0000&ie=utf-8&word=">新闻</a>
<a href="https://tieba.baidu.com/" nslog="normal" nslog-type="10600112" data-href="https://tieba.baidu.com/f?ie=utf-8&fr=bks0000&kw=">贴吧</a>
<a href="https://zhidao.baidu.com/" nslog="normal" nslog-type="10600112" data-href="https://zhidao.baidu.com/search?pn=0&&rn=10&lm=0&fr=bks0000&word=">知道</a>
<a href="http://music.baidu.com/" nslog="normal" nslog-type="10600112" data-href="http://music.baidu.com/search?f=ms&ct=134217728&ie=utf-8&rn=&lm=-1&pn=30&fr=bks0000&key=">音乐</a>
<a href="http://image.baidu.com/" nslog="normal" nslog-type="10600112" data-href="http://image.baidu.com/search/index?tn=baiduimage&ct=201326592&lm=-1&cl=2&nc=1&ie=utf-8&word=">图片</a>
<a href="http://v.baidu.com/" nslog="normal" nslog-type="10600112" data-href="http://v.baidu.com/v?ct=301989888&rn=20&pn=0&db=0&s=22&ie=utf-8&fr=bks0000&word=">视频</a>
<a href="http://map.baidu.com/" nslog="normal" nslog-type="10600112" data-href="http://map.baidu.com/m?ie=utf-8&fr=bks0000&word=">地图</a>
<a href="https://wenku.baidu.com/" nslog="normal" nslog-type="10600112" data-href="https://wenku.baidu.com/search?lm=0&od=0&ie=utf-8&fr=bks0000&word=">文库</a>
<b class="baike">百科</b>
</div>
</div>
<div class="header">
<div class="layout">
<div class="wgt-searchbar wgt-searchbar-new wgt-searchbar-main cmn-clearfix wgt-searchbar-large">
<div class="logo-container">
<a class="logo cmn-inline-block" title="到百科首页" href="/">
<span class="cmn-baike-logo">
<em class="cmn-icon cmn-icons cmn-icons_logo-bai"></em>
<em class="cmn-icon cmn-icons cmn-icons_logo-du"></em>
<em class="cmn-icon cmn-icons cmn-icons_logo-baike"></em>
</span>
</a>
</div>
<div class="search">
<div class="form">
<form id="searchForm" action="/search/word" method="GET" target="_self">
<input id="query" nslog="normal" nslog-type="10080011" name="word" type="text" autocomplete="off" autocorrect="off" value="水电费" /><button id="search" nslog="normal" nslog-type="10080008" type="button">进入词条</button><button id="searchLemma" nslog="normal" nslog-type="10080009" type="button">全站搜索</button><a class="help" href="/help" nslog="normal" nslog-type="10080010" target="_blank">帮助</a>
</form>
<form id="searchLemmaForm" action="/search" method="GET" target="_self">
<input id="searchLemmaQuery" name="word" type="hidden" />
<input name="pn" type="hidden" value="0" />
<input name="rn" type="hidden" value="0" />
<input name="enc" type="hidden" value="utf8" />
</form>
<ul id="suggestion" class="suggestion">
<div class="sug"></div>
<li class="extra">
<span id="clear" style="margin-right:8px;">清除历史记录</span><span id="close" nslog="normal" nslog-type="10080012">关闭</span>
</li>
</ul>
</div></div>
</div>
<div class="declare-wrap" id="J-declare-wrap">
<div class="declare" id="J-declare">声明：百科词条人人可编辑，词条创建和修改均免费，绝不存在官方及代理商付费代编，请勿上当受骗。<a class="declare-details" target="_blank" href="/common/declaration">详情>></a>
<div class="close-btn" id="J-declare-close">
<em class="cmn-icon cmn-icons cmn-icons_close"></em>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="navbar-wrapper">
<div class="wgt-navbar">
<div class="navbar-bg">
<div class="navbar-bg-top">
<div class="navbar-content layout">
<div class="navbar-content-box">
<dl class="index ">
<dt><a href="/">首页</a></dt>
</dl>
<dl class="cat ">
<dt><a>分类</a></dt>
<dd>
<div><a href="/art" target="_blank" class="art">艺术</a></div>
<div><a href="/science" target="_blank" class="technology">科学</a></div>
<div><a href="/ziran" target="_blank">自然</a></div>
<div><a href="/wenhua" target="_blank">文化</a></div>
<div><a href="/dili" target="_blank">地理</a></div>
<div><a href="/shenghuo" target="_blank">生活</a></div>
<div><a href="/shehui" target="_blank">社会</a></div>
<div><a href="/renwu" target="_blank">人物</a></div>
<div><a href="/jingji" target="_blank">经济</a></div>
<div><a href="/tiyu" target="_blank">体育</a></div>
<div><a href="/lishi" target="_blank">历史</a></div>
</dd>
</dl>
<dl class="special ">
<dt><a>特色百科</a></dt>
<dd>
<div><a href="/calendar/" target="_blank">历史上的今天</a></div>
<div><a href="/museum/" target="_blank">数字博物馆</a></div>
<div><a href="/item/史记·2016?fr=navbar" target="_blank">史记·2016</a></div>
<div><a href="/city/" target="_blank">城市百科</a></div>
<div><a href="/operation/worldwar2" target="_blank">二战百科</a></div>
<div><a href="/feiyi?fr=dhlfeiyi" target="_blank">非遗百科</a></div>
</dd>
</dl>
<dl class="user" >
<dt><a>用户</a></dt>
<dd>
<div><a href="/kedou/" target="_blank">蝌蚪团</a></div>
<div><a href="/event/ranmeng/" target="_blank">燃梦计划</a></div>
<div><a href="/task/" target="_blank">百科任务</a></div>
<div><a href="/mall/" target="_blank">百科商城</a></div>
</dd>
</dl>
<dl class="cooperation" >
<dt><a>权威合作</a></dt>
<dd>
<div><a href="/operation/cooperation#joint" target="_blank">合作模式</a></div>
<div><a href="/operation/cooperation#issue" target="_blank">常见问题</a></div>
<div><a href="/operation/cooperation#connection" target="_blank">联系方式</a></div>
</dd>
</dl>
<dl class="mobile" >
<dt><a>手机百科</a></dt>
<dd>
<div><a href="/m#wap" target="_blank">网页版</a></div>
</dd>
</dl>
<div class="usercenter">
<div><a href="/usercenter" target="_blank"><em class="cmn-icon cmn-icons cmn-icons_navbar-usercenter"></em>个人中心</a></div>
</div></div>
</div>
</div>
</div>
</div>
</div>


<div class="body-wrapper">
<div class="before-content">
</div>
<div class="content-wrapper">
<div class="content">
<div class="personal-content">
</div>
<div class="main-content">
<div class="top-tool">
<a class="add-sub-icon top-tool-icon" href="javascript:;" title="添加义项" nslog-type="50000101">
<em class="cmn-icon wiki-lemma-icons wiki-lemma-icons_add-subLemma-solid"></em>
</a>
<a href="/divideload/%E6%B0%B4%E7%94%B5%E8%B4%B9" title="拆分词条" target="_blank" class="split-icon top-tool-icon" style="display:none;" nslog-type="50000104">
<em class="cmn-icon wiki-lemma-icons wiki-lemma-icons_lemma-split"></em>
</a>
<div class="top-collect top-tool-icon" nslog="area" nslog-type="50000102">
<em class="cmn-icon wiki-lemma-icons wiki-lemma-icons_star-solid"></em>
<span class="collect-text">收藏</span>
<div class="collect-tip">查看<a href="/uc/favolemma" target="_blank">我的收藏</a></div>
</div>
<a href="javascript:void(0);" id="j-top-vote" class="top-vote top-tool-icon" nslog-type="10060801">
<em class="cmn-icon wiki-lemma-icons wiki-lemma-icons_zan-solid"></em>
<span class="vote-count">0</span>
<span class="vote-tip">有用+1</span>
<span class="voted-tip">已投票</span>
</a><div class="bksharebuttonbox top-share">
<a class="top-share-icon top-tool-icon" nslog-type="9067">
<em class="cmn-icon wiki-lemma-icons wiki-lemma-icons_share"></em>
<span class="share-count" id="j-topShareCount">0</span>
</a>
<div class="new-top-share" id="top-share">
<ul class="top-share-list">
<li class="top-share-item">
<a class="share-link bds_qzone"  href="javascript:void(0);" nslog-type="10060501">
<em class="cmn-icon cmn-icons cmn-icons_logo-qzone"></em>
</a>
</li>
<li class="top-share-item">
<a class="share-link bds_tsina" href="javascript:void(0);" nslog-type="10060701">
<em class="cmn-icon cmn-icons cmn-icons_logo-sina-weibo"></em>
</a>
</li>
<li class="top-share-item">
<a class="bds_wechat"  href="javascript:void(0);" nslog-type="10060401">
<em class="cmn-icon cmn-icons cmn-icons_logo-wechat"></em>
</a>
</li>
<li class="top-share-item">
<a class="share-link bds_tqq"  href="javascript:void(0);" nslog-type="10060601">
<em class="cmn-icon cmn-icons cmn-icons_logo-qq"></em>
</a>
</li>
</ul>
</div>
</div>
</div>
<div style="width:0;height:0;clear:both"></div><dl class="lemmaWgt-lemmaTitle lemmaWgt-lemmaTitle-">
<dd class="lemmaWgt-lemmaTitle-title">
<h1 >水电费</h1>
<a href="javascript:;" class="edit-lemma cmn-btn-hover-blue cmn-btn-28 j-edit-link"><em class="cmn-icon wiki-lemma-icons wiki-lemma-icons_edit-lemma"></em>编辑</a>
<a class="lock-lemma" target="_blank" href="/view/10812319.htm" title="锁定"><em class="cmn-icon wiki-lemma-icons wiki-lemma-icons_lock-lemma"></em>锁定</a>
</dd>
</dl><div class="promotion-declaration">
</div><div class="lemma-summary" label-module="lemmaSummary">
<div class="para" label-module="para">水电费就是因家庭或组织单位因<a target=_blank href="/item/%E7%94%A8%E6%B0%B4">用水</a><a target=_blank href="/item/%E7%94%A8%E7%94%B5">用电</a>所支出的<a target=_blank href="/item/%E8%B4%B9%E7%94%A8">费用</a>，是“<a target=_blank href="/item/%E6%B0%B4%E8%B4%B9">水费</a>”和“<a target=_blank href="/item/%E7%94%B5%E8%B4%B9">电费</a>”的合称。</div><div class="para" label-module="para">水费是使用供水工程供应的水单位和个人，按照规定向供水单位缴纳的费用。</div><div class="para" label-module="para">耗费“电能”所应付给供电机构的费用称为“<a target=_blank href="/item/%E7%94%B5%E8%B4%B9">电费</a>”。</div>
</div>
<div class="configModuleBanner">
</div><div class="basic-info cmn-clearfix">
<dl class="basicInfo-block basicInfo-left">
<dt class="basicInfo-item name">中文名</dt>
<dd class="basicInfo-item value">
水电费
</dd>
<dt class="basicInfo-item name">外文名</dt>
<dd class="basicInfo-item value">
水电费
</dd>
</dl><dl class="basicInfo-block basicInfo-right">
<dt class="basicInfo-item name">定&nbsp;&nbsp;&nbsp;&nbsp;义</dt>
<dd class="basicInfo-item value">
用水用电所支付的<a target=_blank href="/item/%E8%B4%B9%E7%94%A8">费用</a>
</dd>
<dt class="basicInfo-item name">组&nbsp;&nbsp;&nbsp;&nbsp;成</dt>
<dd class="basicInfo-item value">
水费和电费
</dd>
<dt class="basicInfo-item name">适&nbsp;&nbsp;&nbsp;&nbsp;用</dt>
<dd class="basicInfo-item value">
家庭或者组织
</dd>
</dl></div>
<div class="lemmaWgt-lemmaCatalog">
<div class="lemma-catalog">
<h2 class="block-title">目录</h2>
<div class="catalog-list column-1">
<ol>
<li class="level1">
<span class="index">1</span>
<span class="text"><a href="#1">水费详介</a></span>
</li>
<li class="level1">
<span class="index">2</span>
<span class="text"><a href="#2">电费详介</a></span>
</li>
</ol>

</div>
</div>
</div>
<div class="anchor-list">
<a name="1" class="lemma-anchor para-title" ></a>
<a name="sub1389935_1" class="lemma-anchor " ></a>
<a name="水费详介" class="lemma-anchor " ></a>
</div><div class="para-title level-2" label-module="para-title">
<h2 class="title-text"><span class="title-prefix">水电费</span>水费详介</h2>
<a class="edit-icon j-edit-link" data-edit-dl="1" href="javascript:;"><em class="cmn-icon wiki-lemma-icons wiki-lemma-icons_edit-lemma"></em>编辑</a>
</div>
<div class="para" label-module="para">水费是使用供水工程供应的水单位和个人，按照规定向供水单位缴纳的费用。规定征收水费是现代立法的一个发展趋势，许多国家的<a target=_blank href="/item/%E6%B0%B4%E6%B3%95/634809" data-lemmaid="634809">水法</a>，对全部或部分用水实行征收水费制度。</div>
<div class="para" label-module="para">我国于1985年发布了《水利工程水费核订、计收和管理办法》，对征收水费的目的，核订水费标准的原则，水费的计收、使用和管理等作出了具体规定。</div>
<div class="para" label-module="para">《水法》也规定，使用供水工程供应的水，应当按照规定向供水单位缴纳水费。征收水费的目的是为了合理利用水资源，促进<a target=_blank href="/item/%E8%8A%82%E7%BA%A6%E7%94%A8%E6%B0%B4">节约用水</a>，保证水利工程必需的运行管理、大修和更新改造费用。</div><div class="anchor-list">
<a name="2" class="lemma-anchor para-title" ></a>
<a name="sub1389935_2" class="lemma-anchor " ></a>
<a name="电费详介" class="lemma-anchor " ></a>
</div><div class="para-title level-2" label-module="para-title">
<h2 class="title-text"><span class="title-prefix">水电费</span>电费详介</h2>
<a class="edit-icon j-edit-link" data-edit-dl="2" href="javascript:;"><em class="cmn-icon wiki-lemma-icons wiki-lemma-icons_edit-lemma"></em>编辑</a>
</div>
<div class="para" label-module="para">日常生活中使用的<a target=_blank href="/item/%E7%94%B5%E8%83%BD">电能</a>主要来自其他其他形式能量的转换，包括水能（水力发电）、热能（火力发电）、<a target=_blank href="/item/%E5%8E%9F%E5%AD%90%E8%83%BD">原子能</a>（<a target=_blank href="/item/%E5%8E%9F%E5%AD%90%E8%83%BD%E5%8F%91%E7%94%B5/6337167" data-lemmaid="6337167">原子能发电</a>）、<a target=_blank href="/item/%E9%A3%8E%E8%83%BD">风能</a>（<a target=_blank href="/item/%E9%A3%8E%E5%8A%9B%E5%8F%91%E7%94%B5/4498725" data-lemmaid="4498725">风力发电</a>）、<a target=_blank href="/item/%E5%8C%96%E5%AD%A6%E8%83%BD">化学能</a>（<a target=_blank href="/item/%E7%94%B5%E6%B1%A0">电池</a>）及光能（<a target=_blank href="/item/%E5%85%89%E7%94%B5%E6%B1%A0/2878873" data-lemmaid="2878873">光电池</a>、太阳能电池等）等。电能也可转换成其他所需能量形式。它可以有线或无线的形式作远距离的传输。</div>
<div class="para" label-module="para">电能被广泛应用在动力、照明、冶金、化学、纺织、通信和广播等各个领域，是科学技术发展、国民经济飞跃的主要动力。</div>
<div id="open-tag">
<div class="open-tag-title">词条标签：</div>
<dd id="open-tag-item">
<span class="taglist">
社会
</span>
，<span class="taglist">
生活
</span>
</dd>
<div class="open-tag-collapse" id="open-tag-collapse"></div>
</div>
<div class="clear"></div>
</div>
<div class="side-content">
<div class="summary-pic">
<a href="/pic/%E6%B0%B4%E7%94%B5%E8%B4%B9/10772646/0/9f2f070828381f3097d32287ab014c086f06f0d2?fr=lemma&amp;ct=single" target="_blank" nslog-type="10002401">
<img src="https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=830d354ff1deb48ffb69a6d8c8245d14/9f2f070828381f3097d32287ab014c086f06f0d2.jpg" />
<button class="picAlbumBtn"><em></em><span>图集</span></button>
<div>水电费图册</div>
</a>
</div>
<div class="lemmaWgt-promotion-vbaike">
<div class="promotion_title">V百科<a href="/vbaike#gallary" target="_blank">往期回顾</a></div>
<div class="promotion_viewport">
<dl>
</dl>
<div class="promotion_viewport_pager"></div>
</div>
</div><div class="lemmaWgt-promotion-rightPreciseAd" data-lemmaId="10772646" data-lemmaTitle="水电费"></div><div class="lemmaWgt-sideRecommend">
<a name="zhixinWrap" class="qnAnchor"></a>
<div class="zhixin-box" id="zhixinWrap" data-source="" data-newLemmaId="10772646">
</div>
<form id="zhixinErrorForm" class="hidden" action="https://sp2.baidu.com/-uV1bjeh1BF3odCf/index.php/feedback/zx/baikeJC" target="zhixinSubErr" method="post">
<input class="js-url" name="fb_html_url" type="hidden" />
<input class="js-query" name="fb_query" type="hidden" />
<input class="js-title" name="fb_card_title" type="hidden" />
<input class="js-content" name="fb_content" type="hidden" />
<input class="js-souceId" name="fb_source_id" type="hidden" />
</form>
<iframe id="zhixinSubErr" name="zhixinSubErr" style="display:none" frameborder="0"></iframe>
</div>
<div class="lemmaWgt-promotion-slide">
<div class="promotion_viewport">
<dl>
</dl>
<div class="promotion_viewport_pager"></div>
</div>
</div><div class="lemmaWgt-promotion-rightBigAd">
</div><dl class="side-box lemma-statistics">
<dt class="title">词条统计</dt>
<dd class="description">
<ul>
<li>浏览次数：<span id="j-lemmaStatistics-pv"></span>次</li>
<li>编辑次数：27次<a href="/historylist/%E6%B0%B4%E7%94%B5%E8%B4%B9/10772646" class="nslog:1021" target="_blank">历史版本</a></li>
<li>最近更新：<span class="j-modified-time" style="display:none">2018-04-26</span></li>
<li>创建者：<a class="show-userCard" data-uid="84860460" title="查看此用户资料" target="_blank" href="http://www.baidu.com/p/%E9%BB%91%E8%89%B2%C2%A4%E4%B8%98%E6%AF%94%E7%89%B9" nslog-type="1022">黑色¤丘比特</a></li>
</ul>
</dd>
</dl>
<div class="side-catalog" style="visibility:hidden">
<div class="side-bar">
<em class="circle start"></em>
<em class="circle end"></em>
</div>
<div class="catalog-scroller">
<dl class="catalog-list">
<dt class="catalog-title level1">
<em class="pointer"></em>
<a href="#1" class="title-link">
<span class="text">
<span class="title-index">1</span>
<span class="title-link" nslog-type="10002802">水费详介</span>
</span>
</a>
</dt>
<dt class="catalog-title level1">
<em class="pointer"></em>
<a href="#2" class="title-link">
<span class="text">
<span class="title-index">2</span>
<span class="title-link" nslog-type="10002802">电费详介</span>
</span>
</a>
</dt>
<a class="arrow" href="javascript:void(0);"></a>
</dl>
</div>
<div class="right-wrap">
<a class="go-up disable" href="javascript:void(0);"></a>
<a class="go-down" href="javascript:void(0);"></a>
</div>
<div class="bottom-wrap">
<a class="toggle-button" href="javascript:void(0);" nslog-type="10002803"></a>
<a class="gotop-button" href="javascript:void(0);" nslog-type="10002804"></a>
</div>
</div>
<div id="side_box_fengchao" class="fengchao side-box" nslog="area" nslog-type="10000902">
</div>
<div id="side_box_unionAd" class="unionAd side-box">
<div class="union-content"></div>
</div>
</div>
</div>
</div>
<div class="after-content">
<div class="fc-guess-like new" id="fc_guess_like_new">
<span class="logo-du">
<em class="cmn-icon cmn-icons cmn-icons_logo-du"></em>
</span>
<h6>猜你关注</h6>
<ul class="cmn-clearfix">
</ul>
</div>
<div class="bottom-promotion" id="bottom-promotion">
<div id="BOTTOM_PRO_AD"></div>
</div>
</div>
</div>

<div class="wgt-footer-main">
<div class="content">
<dl class="fresh">
<dt><em class="cmn-icon cmn-icons cmn-icons_footer-fresh"></em>新手上路</dt>
<dd>
<div><a target="_blank" href="/usercenter/tasks#guide">成长任务</a></div>
<div><a target="_blank" href="/help#main01">编辑入门</a></div>
<div><a target="_blank" href="/help#main06">编辑规则</a></div>
<div><a target="_blank" href="/help#main05">百科术语</a></div>
</dd>
</dl>
<dl class="question">
<dt><em class="cmn-icon cmn-icons cmn-icons_footer-question"></em>我有疑问</dt>
<dd>
<div><a id="J-bk-feedback-query" data-lemma="水电费" href="javascript:void(0);" nslog-type="10070001">我要质疑</a></div>
<div><a target="_blank" href="https://aikefu.baidu.com/?product=bk001" nslog-type="10000003">在线客服</a></div>
<div><a target="_blank" href="http://tieba.baidu.com/f?ie=utf-8&fr=bks0000&kw=%E7%99%BE%E5%BA%A6%E7%99%BE%E7%A7%91">参加讨论</a></div>
<div><a id="J-bk-feedback-main" href="javascript:void(0);">意见反馈</a></div>
</dd>
</dl>
<dl class="suggestion">
<dt><em class="cmn-icon cmn-icons cmn-icons_footer-suggestion"></em>投诉建议</dt>
<dd>
<div><a target="_blank" href="http://help.baidu.com/newadd?prod_id=10&category=1">举报不良信息</a></div>
<div><a target="_blank" href="http://help.baidu.com/newadd?prod_id=10&category=2">未通过词条申诉</a></div>
<div><a target="_blank" href="http://help.baidu.com/newadd?prod_id=10&category=6">投诉侵权信息</a></div>
<div><a target="_blank" href="http://help.baidu.com/newadd?prod_id=10&category=5">封禁查询与解封</a></div>
</dd>
</dl>
</div>
<div class="copyright">©2018&nbsp;Baidu&nbsp;<a href="http://www.baidu.com/duty/" target="_blank">使用百度前必读</a>&nbsp;|&nbsp;<a href="http://help.baidu.com/question?prod_en=baike&class=89&id=1637" target="_blank">百科协议</a>&nbsp;|&nbsp;<a href="/operation/cooperation" target="_blank">百度百科合作平台</a>&nbsp;|&nbsp;<span>京ICP证030173号&nbsp;</span><img class="copyright-img" width="13" height="16" src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/copy_rignt_24.png"></div>
<p class="recordcode"><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11000002000001" target="_blank"><i class="icon-police"></i>京公网安备11000002000001号</a></p>
</div>


<div class="lemmaWgt-searchHeader">
<div class="layout cmn-clearfix">
<div class="wgt-searchbar wgt-searchbar-new wgt-searchbar-simple cmn-clearfix ">
<div class="logo-container">
<a class="logo cmn-inline-block" title="到百科首页" href="/">
<span class="cmn-baike-logo">
<em class="cmn-icon cmn-icons cmn-icons_logo-bai"></em>
<em class="cmn-icon cmn-icons cmn-icons_logo-du"></em>
<em class="cmn-icon cmn-icons cmn-icons_logo-baike"></em>
</span>
</a>
</div>
<div class="search">
<div class="form">
<form id="searchForm" action="/search/word" method="GET" target="_self">
<input id="query" nslog="normal" nslog-type="10080015" name="word" type="text" autocomplete="off" autocorrect="off" value="水电费" /><button id="search" nslog="normal" nslog-type="10080013" type="button">进入词条</button>
</form>
<form id="searchLemmaForm" action="/search" method="GET" target="_self">
<input id="searchLemmaQuery" name="word" type="hidden" />
<input name="pn" type="hidden" value="0" />
<input name="rn" type="hidden" value="0" />
<input name="enc" type="hidden" value="utf8" />
</form>
<ul id="suggestion" class="suggestion">
<div class="sug"></div>
<li class="extra">
<span id="clear" style="margin-right:8px;">清除历史记录</span><span id="close" nslog="normal" nslog-type="10080016">关闭</span>
</li>
</ul>
</div>
</div>
</div>
<div class="tool-buttons">
<a class="toolButtons-edit button j-edit-link" href="javascript:;" nslog-type="10010001"><em class="cmn-icon wiki-lemma-icons wiki-lemma-icons_edit-hollow"></em>编辑</a>
<a class="toolButtons-collect button" href="javascript:;" nslog-type="10010002"><em class="cmn-icon wiki-lemma-icons wiki-lemma-icons_star-hollow"></em><em class="cmn-icon wiki-lemma-icons wiki-lemma-icons_star-solid"></em>收藏</a>
<a class="toolButtons-vote button top-vote" href="javascript:;" nslog-type="10010003"><em class="cmn-icon wiki-lemma-icons wiki-lemma-icons_zan-hollow"></em><em class="cmn-icon wiki-lemma-icons wiki-lemma-icons_zan-solid"></em><span class="j-tool-btn-vote-num">赞</span></a>
</div>
<div class="user-info">
<a class="user-link unlogin" href="javascript:;" nslog-type="10010008" target="_blank">登录</a>
</div>
</div></div>
<div class="new-bdsharebuttonbox new-side-share" id="side-share">
<span class="title">分享</span>
<div class="side-border">
<div class="triangle"></div>
<a class="share-link bds_qzone"  href="javascript:void(0);" nslog-type="10060101">
<em class="cmn-icon cmn-icons cmn-icons_logo-qzone"></em>
</a>
<a class="share-link bds_tsina" href="javascript:void(0);" nslog-type="10060301">
<em class="cmn-icon cmn-icons cmn-icons_logo-sina-weibo"></em>
</a>
<a class="bds_wechat"  href="javascript:void(0);" nslog-type="10060001">
<em class="cmn-icon cmn-icons cmn-icons_logo-wechat"></em>
</a>
<a class="share-link bds_tqq"  href="javascript:void(0);" nslog-type="10060201">
<em class="cmn-icon cmn-icons cmn-icons_logo-qq"></em>
</a>
</div>
</div>
<div class="qrcode-wrapper" id="layer" style="display: none">
<div class="bd_weixin_popup_header">
<em class="cmn-icon cmn-icons cmn-icons_close"></em>
<span>分享到微信朋友圈</span>
</div>
<div id="wechat-qrcode-img"></div>
<div class="bd_weixin_popup_footer">打开微信“扫一扫”即可将网页分享至朋友圈</div>
</div>
</div>  
</template>

<script>

import pro from '../assets/common'
import tabExchange from './tab_exchange'
import keyBoard from './key_board'
const local = pro.local;
const configList = {
        CNY: require('../assets/images/cny.png'),
        USD: require('../assets/images/usd.png'),
        EUR: require('../assets/images/eur.png'),
        JPY: require('../assets/images/jpy.png'),
        HKD: require('../assets/images/cny.png'),
        KRW: require('../assets/images/krw.png'),
        GBP: require('../assets/images/gdp.png'),
        TWD: require('../assets/images/cny.png'),
        AUD: require('../assets/images/cny.png'),
    }
export default {
  name: 'index',
  components: {
    tabExchange,
    keyBoard
  },
  data () {
    return {
        tabShow: false,
        inputMoney: '1',
        chooseItem: {},
        chooseIndex: '',
        currentItem1: {},
        currentList: [],
        currentItem2: {},
        currentItem3: {},
        flagList: configList,
        initItem: ['CNY', 'USD', 'EUR'],
    }  
  },
  computed: {
     clientHeight() {
        return document.documentElement.clientHeight + 'px';
    }, 
    rate1 () {
        
        return this.currentItem1&&this.currentItem2.name&&this.currentItem1[this.currentItem2.name.toLowerCase()]
    },
    rate2 () {
        return this.currentItem1&&this.currentItem2.name&&this.currentItem1[this.currentItem3.name.toLowerCase()]
    },
    money2 () {
        if(!this.inputMoney) return;
        let money = this.inputMoney * this.rate1;
        let changeMoney = this.keepDigits(money);
        return this.toThousands(changeMoney)
    },
    money3 () {
        if(!this.inputMoney) return;
        let money = this.inputMoney * this.rate2;
        let changeMoney = this.keepDigits(money);       
        return this.toThousands(changeMoney);
    },
    indexList () {
        return [this.currentItem1, this.currentItem2, this.currentItem3]
    }
  },
  methods: {  
    goTo (id) {
        this.$router.push({path:id})
    },
    changeValue (msg, key) {
      this[key] = msg
      
    },
    changeItem (msg,key) {
        const list = ['currentItem1', 'currentItem2', 'currentItem3']
        this[list[this.chooseIndex]] = msg;
        this.changeValue(msg, key)
    },
    showTab (index) {
        const list = ['currentItem1', 'currentItem2', 'currentItem3']
        this.chooseIndex = index
        this.tabShow = true
        this.chooseItem = this[list[index]];
    },
    toThousands (num,nums = 4){
        let res=num&&num.toString().replace(/\d+/, function(n){ // 先提取整数部分
            return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
                return $1+",";
            });
        })
        return res
    },
    keepDigits (num,digits = 4) {
        let length = num.toString().split('.')[1]&&num.toString().split('.')[1].length;
        if(length<=digits){
            return num
        }else{
            num = typeof num === 'string'?parseFloat(num):num;
            return num&&num.toFixed(digits)
        }   
    },
    getList () {
        this.$axios.post('GetExchangeRate', {
        })
        .then((res) => {
            //console.log(res.data)
            if (res.data.success == 'true') {
                this.currentList = res.data.data
                return res.data.data
            }

        })
        .catch(function (error) {
            console.log(456)
            //console.log(error);
        })
        .then((abc)=>{
            console.log(abc)

            this.initItem.forEach((element,i) => {
                this['currentItem'+(i+1)] =  abc.find(item => {
                    return item.name === element
                })
            })   
                
        });

    }
    

  },
  created () {
      this.getList()
   
      
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/css/common.scss";
$bgGray: #dfe4e6;
$bgWhite: #ffffff;
$fontBlack: #333;
#index{
    width: 7.5rem;
    background-color: #ebf0f2
}
.header{
  h2{
    @include font(0.36rem,0.88rem,#fff);
    background-color: #333340;
  }
}
.list-wrap{
  width: 7.5rem;
  padding-top: 0.2rem;
  background-color: $bgGray;
  ul{
    background-color: $bgWhite;
    
    
  }
  .item{
    display: flex;
    align-content: center;
    justify-content: space-between;
    @include font(0.26rem,1.6rem,$fontBlack); 
    padding: 0 0.3rem;
    border-bottom: 1px solid $bgGray;
  }
  .left_box{
        flex: 0 0 1.6rem;
        text-align: left;
      img{
          display: inline-block;
          vertical-align: middle;
          width: 0.4rem;
          height: 0.3rem;
        
      }
      span{
          position: relative;
          vertical-align: middle;
          
          &::after{
              content: '';
              display: inline-block;
              width: 0;
              height: 0;
              margin-left: 0.1rem;
              border: 0.12rem solid transparent;
              border-top: 0.12rem solid #c6c6cc;
              vertical-align: middle;
              
          }
      }
  }
  .center_box{
      p{
        display: inline-block;
        vertical-align: middle;
        width: 2.5rem;
        height: 1rem;
        background-color: #fafafa;
        border-radius: 0.08rem;
        @include font(0.28rem,1rem,#333);
        
      }
        
  }
  .right_box{
      flex: 0 0 2rem;
      text-align: right;
      color: #666;
  }
  .exchange_item{
      .center_box p{
          background-color: #4595e6;
          color: #fff;
      }                 
        
  }
  }
.key_wrap {
    width: 7.5rem;
    position: fixed;
    bottom: 0;
}
.key_board {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap; 
    background-color: #fff;
    .left{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-wrap: wrap;
        width: 5.63rem;
        
        .small_item,.big_item{
            box-sizing: border-box;
            width: 1.86rem;
            height: 1.2rem;
            border: 1px solid #dfe4e6;
            border-top: 0;
            border-left: 0;
            @include font(0.36rem,1.2rem,#333);
        }
        .big_item{
            width: 3.62rem
        }
        
    }
    li{
        width: 1.87rem;   
        height: 2.4rem;     
        box-sizing: border-box;
        //border: 1px solid #dfe4e6;
    }
    .clear{
        height: 2.4rem;
        @include font(0.36rem,2.4rem,#333);
        border-bottom: 1px solid #dfe4e6;
    }
    .clear_back{
         height: 2.4rem;
        @include font(0.36rem,2.4rem,#333);
        border-bottom: 1px solid #dfe4e6;
        background: url('../assets/images/clear_back.png') center center no-repeat;
        background-size: 0.4rem 0.26rem;
    }

}  

 
//   @for $i from 1 through 6 {
//       $background: ('huangjin', 'baiyin', 'xiaomai', 'yumi', 'TIA', 'other');
//       li:nth-child(#{$i}) {
//         $test: nth($background,$i);
//         background: url('../assets/img/#{$test}.jpg') center center no-repeat;
      
//       }
//     }

</style>
