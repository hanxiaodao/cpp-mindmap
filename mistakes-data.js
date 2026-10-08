/* ── 错题数据（由 AI 维护）────────────────────────────
 * 录入流程：把错题发给 AI（拍照、口述、粘贴题干均可）→ AI 总结为条目追加到下方数组
 *          → git add/commit/push → GitHub Pages 上线，mistakes.html 自动显示
 *
 * 字段说明（只有 exam / q / fix 三个必须有值，其余都可缺省）：
 *   exam  试卷编号，分组依据，如 "2025年10月"（写成"YYYY年M月"才能按时间倒序排）
 *   no    题号，如 "5" 或 "单选5"（可缺省）
 *   type  题型："单选" | "填空" | "程序填空" | "程序分析" | "程序设计"（可缺省，页面会自动生成筛选项）
 *   ch    章节号 1~9（0 或缺省 = 未分类）：
 *         1 C++语言基础  2 类与对象  3 构造析构与特殊成员  4 运算符重载  5 继承与派生
 *         6 多态与虚函数  7 输入/输出流  8 文件操作  9 模板
 *   kp    考点，如 "考点18"（可缺省）
 *   q     题目概述（题干文字，可含代码说明）
 *   opts  选项数组（选择题用，每项一行显示，如 "A. 基类的析构函数不能被继承"）
 *   code  代码/程序片段（程序填空、程序分析、程序设计题用；保留缩进原样显示）
 *   wrong 我的错因（当时为什么做错）
 *   fix   正确思路 / 答案 / 考点讲解
 *   done  是否已掌握：true = 已掌握，false = 未掌握（默认 false）
 * ──────────────────────────────────────────────────── */
window.MISTAKES = [
  /* ── 追加新错题：把下面模板复制出来改内容，粘在本行位置（数组内、逗号分隔）──
  { exam:"2025年10月", no:"5", type:"单选", ch:3, kp:"考点18",
    q:"下列关于构造函数的说法中，正确的是",
    opts:["A. 构造函数可以声明返回类型",
          "B. 构造函数不能被继承",
          "C. 构造函数可以声明为虚函数",
          "D. 构造函数可以显式调用"],
    wrong:"把「构造函数可以被继承」和「派生类能调用基类构造函数」搞混，错选了 A/C 里的干扰项",
    fix:"答案 B。构造函数不能被继承——派生类只是在自己的构造函数初始化列表里调用基类构造函数。构造函数不能声明返回类型（连 void 都不行）、不能是虚函数（对象还没构造完，虚表指针未建立）、不能像普通成员函数那样显式调用（a.A() 非法）。",
    done:false },
  ── 程序题模板（带代码）──
  { exam:"2025年4月", no:"三、1", type:"程序分析", ch:6, kp:"考点39",
    q:"写出下面程序的运行结果",
    code:"class Base {\npublic:\n  Base(){ cout << \"B\"; }\n  virtual ~Base(){ cout << \"~B\"; }\n};\nclass D : public Base {\npublic:\n  D(){ cout << \"D\"; }\n  ~D(){ cout << \"~D\"; }\n};\nint main(){ Base* p = new D; delete p; }",
    wrong:"只按构造顺序写了 BD，析构顺序漏写、或者把析构顺序也当成先基类后派生",
    fix:"输出 B D ~D ~B。构造顺序：先基类后派生（Base 构造、D 构造）；析构顺序相反：先派生后基类（~D、~B）。这里 p 是 Base* 但析构函数是 virtual，所以 delete p 能正确调到 ~D，否则只输出 ~B（未定义行为的内存泄漏）。",
    done:false },
  ── 追加新错题 ──
  */

  { exam:"2025年10月", no:"24", type:"程序填空", ch:6, kp:"考点40",
    q:"将下面的程序补充完整，使程序输出的结果为：C++程序设计 / E::~E() called. / B::~B() called.",
    code:"#include<iostream>\n#include<string>\nusing namespace std;\nclass B {\npublic:\n  void start() { cout<<\"B::start() called.\\n\"; }\n  ____(1)____ { cout<<\"B::~B() called.\\n\"; }\n};\nclass E : public B {\nprivate:\n  string buf;\npublic:\n  E(string p) { ____(2)____; cout<<buf<<endl; }\n  ~E() { cout<<\"E::~E() called.\\n\"; }\n};\nvoid fun(B *a) { delete a; }\nint main() {\n  B *a = ____(3)____;\n  fun(a);\n}",
    wrong:"第(1)空只写了 ~B() 漏了 virtual——没意识到 a 虽是 B* 但实际指向 E 对象，对「经基类指针 delete 派生类对象必须配虚析构」这条规则不熟",
    fix:"答案：(1) virtual ~B()；(2) buf=p；(3) new E(\"C++程序设计\")。关键在第(1)空：a 是 B* 指向 E 对象，delete a 时若 ~B 非虚，只会调基类析构、不会输出 E::~E()（派生部分未释放，还可能内存泄漏）；基类析构声明为 virtual 后，析构按先派生后基类的顺序执行，才得到 E::~E() called. 和 B::~B() called.。(2) 把形参存入 buf，构造时才能输出第一行 C++程序设计；(3) 用派生类构造函数在堆上建 E 对象交给基类指针。",
    done:false },

  { exam:"2025年10月", no:"25", type:"程序填空", ch:9, kp:"考点52",
    q:"将下面的程序补充完整，使程序输出的结果为：-1,4-->4 / 1.5,3.8-->3.8",
    code:"#include <iostream>\nusing namespace std;\n____(1)____\nclass A {\npublic:\n  T x,y;\n  void f(T a,T b) { x=a; y=b; }\n  ____(2)____{ return (x>y)?x:y; }\n  void print(T x,T y) { cout<<x<<\",\"<<y<<\"-->\"<<max(x,y)<<endl; }\n};\nint main() {\n  A <int>a;\n  A <double>b;\n  a.f(-1,4);\n  a.print(a.x,a.y);\n  ____(3)____;\n  b.print(b.x,b.y);\n}",
    wrong:"第(1)空写错了——类模板定义开头必须有一行 template<typename T>（或 template<class T>）的模板声明，这里没写对，T 就无从声明",
    fix:"答案：(1) template<typename T>（写 template<class T> 也可以）；(2) T max(T x,T y)；(3) b.f(1.5,3.8)。A<int>、A<double> 说明 A 是类模板：第(1)空必须在 class A 之前写模板声明行，T 才能作为成员的类型使用（类模板定义格式：template<typename T> + class，漏写或格式错都编译不过）；第(2)空 max 是返回较大者的成员函数，返回类型和两个参数都用 T；第(3)空 b 是 A<double> 对象，先调 b.f(1.5,3.8) 存入 x、y，print 才输出 1.5,3.8-->3.8（第一行 -1,4-->4 由 a.f(-1,4) 得来）。",
    done:false },

  { exam:"2025年10月", no:"30", type:"程序分析", ch:7, kp:"考点43",
    q:"阅读程序，写出运行结果（cout 格式控制：width / precision / setf(showpos) / setw / setf(scientific)）",
    code:"#include <iostream>\n#include <iomanip>\nusing namespace std;\nint main()\n{\n  double a = 123.45678;\n  cout.width(4);    cout<<\"*\"<<\"a=\"<<endl;\n  cout.precision(6);    cout<<a<<endl;\n  cout.setf(ios::showpos);    cout<<a<<endl;\n  cout<<setw(10)<<-a<<endl;\n  cout.setf(ios::scientific);    cout<<a<<endl;\n}",
    wrong:"三个坑都踩了：① 对齐方式错误——忘了默认右对齐，补位应补在左边；② 错误地用 * 填充——width 的填充符默认是空格（除非 setfill 指定），题里的 \"*\" 是要输出的内容不是填充符；③ 科学计数法写错——scientific 下 precision(6) 是小数点后 6 位，且 showpos 设置后一直有效，最后一行也要带 +",
    fix:"5 行输出（␣ 代表空格）：\n␣␣␣*a=\n123.457\n+123.457\n␣␣-123.457\n+1.234568e+002\n① width(4) 只作用于紧随其后的 \"*\"（一次有效）：1 个字符右对齐补 3 个空格到宽 4，再原样输出 a=。\n② precision(6)：默认格式下是 6 位有效数字 → 123.457。\n③ setf(showpos) 持久生效，正数前加 + → +123.457。\n④ setw(10) 一次有效：-123.457 共 8 字符，右对齐左补 2 个空格；负数自带 -，showpos 对负数不再加 +。\n⑤ setf(scientific) 后 precision 变成小数点后位数 → 1.234568e+002（教材/VC 口径指数 3 位；GCC 等编译器输出 e+02），showpos 仍未清除 → 前面带 +。",
    done:false },

  { exam:"2025年10月", no:"28", type:"程序分析", ch:5, kp:"考点34",
    q:"阅读程序，写出运行结果（Person 基类 + Student/Teacher 派生类，两个栈上对象的构造析构顺序）",
    code:"#include <iostream>\nusing namespace std;\n\nclass Person\n{\npublic:\n    Person() { cout << \"Constructor of Person:\" << endl; }\n    ~Person() {}\n};\n\nclass Student: public Person\n{\npublic:\n    Student() { cout << \"Constructor of Student\" << endl; }\n    ~Student() {}\n};\n\nclass Teacher: public Person\n{\npublic:\n    Teacher() {}\n    ~Teacher() { cout << \"Destructor of Teacher\" << endl; }\n};\n\nint main()\n{\n    Student s;\n    Teacher t;\n}",
    wrong:"输出顺序写错——漏了构造 Teacher 时也会先调基类构造、再输出一行 Constructor of Person:（每个派生类对象构造都要先走基类构造）；或把析构顺序当成先构造的先析构；~Student、~Person 函数体是空的，没有输出，别多写",
    fix:"4 行输出（已用编译器实测）：\nConstructor of Person:\nConstructor of Student\nConstructor of Person:\nDestructor of Teacher\n① 构造按对象定义顺序：先 s 后 t；且每个派生类对象构造都先调基类构造——s：Person 构造输出（注意行尾有冒号，Student 那行没有）→ Student 构造输出；t：Person 构造又输出一行 → Teacher 构造体为空不输出。\n② 析构与构造完全相反：t 先析构 → ~Teacher 输出 Destructor of Teacher → ~Person（空体无输出）；再 s 析构 → ~Student（空）→ ~Person（空），都无输出。\n③ ~Person 不是虚函数也没关系：s、t 是栈上具名对象，不是经基类指针 delete，派生类析构一定被调用；哪些行有输出只取决于哪个构造/析构函数体里写了 cout。",
    done:false },

  { exam:"2025年10月", no:"31", type:"程序设计", ch:1, kp:"考点7",
    q:"编写程序：先输入一个整数 n(n<100)，再输入 n 个数保存在一维数组 A 中，调用自定义函数 sortA() 将这 n 个数从小到大排序，主函数中输出排序后的结果",
    code:"#include <iostream>\nusing namespace std;\nvoid sortA(int a[], int n)\n{\n    int i, j, t;\n    for (i = 0; i < n - 1; i++)\n        for (j = 0; j < n - 1 - i; j++)\n            if (a[j] > a[j + 1])\n            { t = a[j]; a[j] = a[j + 1]; a[j + 1] = t; }\n}\nint main()\n{\n    int a[100], n, i;\n    cin >> n;\n    for (i = 0; i < n; i++)\n        cin >> a[i];\n    sortA(a, n);\n    for (i = 0; i < n; i++)\n        cout << a[i] << \" \";\n    cout << endl;\n    return 0;\n}",
    wrong:"排序边界和数组传参不熟：内层循环条件 j<n-1-i 容易误写成 j<n（越界多比一次）；形参 int a[] 与 int *a 的等价关系、数组名作实参自动传地址这点犹豫不决；趟数 n-1 与每趟比较次数容易差一",
    fix:"参考答案见上方代码（冒泡排序，已编译运行验证：输入 5 个数 3 1 4 1 5 → 输出 1 1 3 4 5）。\n① n<100 → 数组开 a[100]；形参 int a[] 等价 int *a，数组名作实参传的就是地址，所以 sortA 里排好序，主函数里的 a 也就有序了。\n② 冒泡双循环：外层共 n-1 趟（i=0 到 n-2）；内层 j<n-1-i——每趟把当前最大值沉底后，尾部已就位的元素不用再比。\n③ 交换必须借临时变量：t=a[j]; a[j]=a[j+1]; a[j+1]=t;。\n④ 2025 年起程序设计第一小题考这种纯基础保底题（数组+函数），必须 10 分拿满。",
    done:false },

  { exam:"2025年10月", no:"32", type:"程序设计", ch:8, kp:"考点48",
    q:"编写程序：把 d 盘根目录下文件 file1.txt 的内容复制到同目录下新建的文件 file2.txt 中，并显示 file2.txt 文件的内容，若打开文件失败请给出提示",
    code:"#include <iostream>\n#include <fstream>\nusing namespace std;\nint main()\n{\n    char ch;\n    ifstream fin(\"d:\\\\file1.txt\");\n    if (!fin) { cout << \"打开 file1.txt 失败\" << endl; return 0; }\n    ofstream fout(\"d:\\\\file2.txt\");\n    if (!fout) { cout << \"创建 file2.txt 失败\" << endl; return 0; }\n    while (fin.get(ch))\n        fout << ch;\n    fin.close();\n    fout.close();\n    ifstream f2(\"d:\\\\file2.txt\");\n    if (!f2) { cout << \"打开 file2.txt 失败\" << endl; return 0; }\n    while (f2.get(ch))\n        cout << ch;\n    f2.close();\n    return 0;\n}",
    wrong:"文件复制的固定套路没记牢：打开失败判断 if(!fin) 漏写；逐字符复制误用 fin>>ch（>> 按空白分隔提取，空白和换行全丢，复制后格式乱）；显示 file2 内容时要先 close 再重新打开读取，顺序容易乱",
    fix:"参考答案见上方代码（考点48 固定套路：打开→判断→复制→关闭→重开显示，已编译验证打开失败的提示分支）。\n① 打开即判断：if(!fin){cout<<\"打开失败\"…;return 0;}——题目明说「打开失败请给出提示」，每个流都要判；ofstream fout(\"d:\\\\file2.txt\") 默认 ios::out，文件不存在则新建（题目要的「新建」就是这么来的）。\n② 复制用 while(fin.get(ch)) fout<<ch;——get(ch) 逐字符且不跳过空白换行；用 >> 复制会把所有空白换行丢掉。\n③ 显示：先 fin.close()/fout.close()，再 ifstream f2 重新打开 file2.txt 读出来 cout，读完 f2.close()。\n④ 路径写在字符串里，反斜杠必须双写：源码里是 \"d:\\\\file1.txt\"。",
    done:false },
];
