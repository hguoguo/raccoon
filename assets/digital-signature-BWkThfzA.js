import{j as e,g as r}from"./index-hyqxTCwJ.js";import{K as d}from"./KnowledgeLayout-CwkOMHwC.js";import{P as a}from"./Playground-C6lk-t6G.js";import{S as x}from"./SideNote-BKvanovA.js";import{C as t,A as n,S as l}from"./ArticleNav-DhfiS38Y.js";import{D as s}from"./DiagramBlock-CLaKE9_7.js";import{I as c}from"./InterviewSection-BBNdwyyN.js";const m=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"整体架构",level:2},{id:"principle",text:"工作原理",level:2},{id:"process",text:"签名与验签流程",level:3},{id:"algorithms",text:"常见算法",level:3},{id:"certificate",text:"数字证书",level:2},{id:"x509",text:"X.509证书标准",level:3},{id:"ca",text:"CA认证机构",level:3},{id:"ssl-tls",text:"SSL/TLS协议",level:3},{id:"keystore",text:"KeyStore与TrustStore",level:2},{id:"playground",text:"代码实验场",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"对比分析",level:2}];function u({meta:i}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(d,{meta:i,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:[e.jsx("strong",{children:"数字签名"}),"是基于非对称加密和哈希函数的身份认证机制，通过私钥签名、公钥验签， 确保数据的",e.jsx("strong",{children:"完整性"}),"、",e.jsx("strong",{children:"身份认证"}),"和",e.jsx("strong",{children:"不可否认性"}),"， 是HTTPS、代码签名、电子合同的核心技术。"]})}),e.jsxs(t,{type:"tip",title:"为什么需要数字签名？",children:["在互联网通信中，我们面临三大安全威胁：",e.jsxs("ul",{className:"list-disc list-inside mt-2 space-y-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"篡改"}),"：数据在传输过程中被恶意修改"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"伪造"}),"：攻击者冒充合法发送方"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"抵赖"}),"：发送方否认自己发送过某条消息"]})]}),"数字签名通过密码学技术同时解决这三个问题。"]}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"整体架构"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["数字签名体系由多个组件构成：",e.jsx("strong",{children:"签名算法"}),"、",e.jsx("strong",{children:"数字证书"}),"、",e.jsx("strong",{children:"CA认证机构"}),"和",e.jsx("strong",{children:"密钥管理"}),"。Java提供了完整的API支持（JCA）。"]}),e.jsx(s,{title:"数字签名体系架构",children:`
┌─────────────────────────────────────────────┐
│         应用层                                │
│   HTTPS / 代码签名 / 电子合同 / JWT          │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│       数字签名API（java.security）           │
│   Signature / KeyPair / Certificate         │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│       数字证书（X.509）                      │
│   - 公钥                                     │
│   - 持有者信息                               │
│   - CA签名                                   │
│   - 有效期                                   │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│       CA认证机构（Certificate Authority）    │
│   - Let's Encrypt（免费）                    │
│   - DigiCert（商业）                         │
│   - GlobalSign（商业）                       │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│       底层加密算法                           │
│   RSA / ECDSA + SHA-256 / SHA-384          │
└─────────────────────────────────────────────┘
            `}),e.jsx(x,{children:e.jsxs("p",{className:"text-sm text-ink-muted",children:[e.jsx("strong",{children:"关键点："}),"数字签名 ≠ 加密。签名是为了验证身份和完整性， 加密是为了保护数据机密性。两者经常配合使用（如HTTPS）。"]})}),e.jsx("h2",{id:"principle",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"工作原理"}),e.jsx("h3",{id:"process",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"签名与验签流程"}),e.jsx(s,{title:"数字签名完整流程",children:`
发送方（签名）                     接收方（验签）
     |                                  |
     |  1. 计算数据哈希                  |
     |     Hash = SHA256(Data)          |
     |                                  |
     |  2. 用私钥加密哈希                |
     |     Signature = Encrypt          |
     |       (Hash, PrivateKey)         |
     |                                  |
     |  3. 发送数据+签名                 |
     |  ─────────────────────────────►  |
     |                                  |
     |                             4. 计算数据哈希
     |                                Hash' = SHA256(Data)
     |                                  |
     |                             5. 用公钥解密签名
     |                                Hash'' = Decrypt
     |                                  (Signature, PublicKey)
     |                                  |
     |                             6. 对比哈希值
     |                                Hash' == Hash'' ?
     |                                  |
     |                          ✓ 一致：验证通过
     |                          ✗ 不一致：验证失败
            `}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"核心步骤解析："}),e.jsxs("ol",{className:"list-decimal list-inside space-y-2 text-[14px] sm:text-[15px] leading-[1.8] text-ink-muted mb-6",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"哈希计算"}),"：对原始数据计算SHA-256哈希，得到固定长度的摘要"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"私钥签名"}),"：用发送方的私钥加密哈希值，生成数字签名"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"传输"}),"：将原始数据和签名一起发送给接收方"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"哈希计算"}),"：接收方对收到的数据重新计算哈希"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"公钥验签"}),"：用发送方的公钥解密签名，得到原始哈希"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"对比验证"}),"：如果两个哈希一致，说明数据未被篡改且来源可信"]})]}),e.jsx("h3",{id:"algorithms",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"常见算法"}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full divide-y divide-border border border-border rounded-paper-md",children:[e.jsx("thead",{className:"bg-parchment-deep",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"算法"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"类型"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"密钥长度"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"速度"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"安全性"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"应用场景"})]})}),e.jsxs("tbody",{className:"bg-white divide-y divide-border",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"RSA-SHA256"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"非对称"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"2048-4096位"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"🐢 慢"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅ 高"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"SSL证书、代码签名"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"ECDSA-SHA256"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"椭圆曲线"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"256位"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"⚡ 快"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅ 高"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"区块链、移动端"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"DSA-SHA256"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"非对称"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"2048位"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"🐢 慢"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅ 高"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"政府系统"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"Ed25519"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"椭圆曲线"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"256位"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"⚡ 很快"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅ 很高"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"SSH、现代TLS"})]})]})]})}),e.jsx(t,{type:"info",title:"算法选择建议",children:e.jsxs("p",{className:"text-sm",children:[e.jsx("strong",{children:"RSA"}),"：最成熟、兼容性最好，适合传统系统",e.jsx("br",{}),e.jsx("strong",{children:"ECDSA"}),"：密钥更短、速度更快，适合移动设备和区块链",e.jsx("br",{}),e.jsx("strong",{children:"Ed25519"}),"：最新推荐算法，性能最优，适合新项目"]})}),e.jsx("h2",{id:"certificate",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"数字证书"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:['数字证书是公钥的"身份证"，由受信任的CA机构签发，证明公钥的所有权。 最常见的证书标准是 ',e.jsx("strong",{children:"X.509"}),"。"]}),e.jsx("h3",{id:"x509",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"X.509证书标准"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"X.509证书包含以下关键信息："}),e.jsx("div",{className:"bg-parchment-deep p-4 rounded-paper-md mb-6",children:e.jsx("pre",{className:"text-sm font-mono text-ink",children:`证书字段：
├── 版本（Version）：v3
├── 序列号（Serial Number）：唯一标识
├── 签名算法（Signature Algorithm）：SHA256withRSA
├── 颁发者（Issuer）：CA机构信息
├── 有效期（Validity）
│   ├── Not Before：2024-01-01
│   └── Not After：2025-01-01
├── 主体（Subject）：证书持有者信息
│   ├── CN（Common Name）：域名
│   ├── O（Organization）：组织名称
│   └── C（Country）：国家代码
├── 公钥信息（Subject Public Key Info）
│   ├── 算法：RSA
│   └── 公钥：-----BEGIN PUBLIC KEY-----...
├── 扩展字段（Extensions）
│   ├── Subject Alternative Name：多域名
│   ├── Key Usage：密钥用途
│   └── Basic Constraints：是否为CA证书
└── CA签名（Signature Value）`})}),e.jsx("h3",{id:"ca",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"CA认证机构"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"CA（Certificate Authority）"}),"是受信任的第三方机构，负责签发和管理数字证书。"]}),e.jsx(s,{title:"证书链验证过程",children:`
根CA（Root CA）
  │ 自签名证书
  │ 私钥严格保管（离线存储）
  ▼
中间CA（Intermediate CA）
  │ 由根CA签名
  │ 可以签发多个中间CA
  ▼
服务器证书（Server Certificate）
  │ 由中间CA签名
  │ 包含网站公钥
  │ 颁发给 example.com
  
验证流程：
1. 浏览器检查服务器证书是否由可信CA签发
2. 沿着证书链向上验证：服务器证书 → 中间CA → 根CA
3. 检查根CA是否在浏览器的信任列表中
4. 检查证书有效期、域名匹配、吊销状态
5. 全部通过 → 信任该证书
            `}),e.jsx(t,{type:"warning",title:"⚠️ 自签名证书",children:e.jsx("p",{className:"text-sm",children:'自签名证书是由证书持有者自己签发的证书，没有经过CA认证。 浏览器会显示"不安全"警告，仅适用于内部测试环境。 生产环境必须使用CA签发的证书。'})}),e.jsx("h3",{id:"ssl-tls",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"SSL/TLS协议"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"SSL/TLS"}),"是数字签名最重要的应用场景，用于保护HTTP通信（HTTPS）。"]}),e.jsx(s,{title:"TLS握手过程（简化版）",children:`
客户端                          服务器
  |                               |
  |  ClientHello                  |
  |  （支持的加密套件列表）         |
  |  ──────────────────────────►  |
  |                               |
  |                          ServerHello
  |                          （选择的加密套件）
  |                          Server Certificate
  |                          （服务器证书）
  |  ◄──────────────────────────  |
  |                               |
  |  验证证书有效性                 |
  |  （CA签名、有效期、域名）       |
  |                               |
  |  Client Key Exchange          |
  |  （用服务器公钥加密会话密钥）   |
  |  ──────────────────────────►  |
  |                               |
  |                          用私钥解密
  |                          得到会话密钥
  |                               |
  |  Change Cipher Spec           |
  |  Finished（加密）              |
  |  ──────────────────────────►  |
  |                               |
  |                          Change Cipher Spec
  |                          Finished（加密）
  |  ◄──────────────────────────  |
  |                               |
  |  ✓ 握手完成，开始加密通信      |
  |  ◄═════════════════════════►  |
  |     AES加密 + HMAC认证        |
            `}),e.jsx("h2",{id:"keystore",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"KeyStore与TrustStore"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Java使用 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"KeyStore"}),"和 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"TrustStore"}),"管理密钥和证书。"]}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full divide-y divide-border border border-border rounded-paper-md",children:[e.jsx("thead",{className:"bg-parchment-deep",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"特性"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"KeyStore"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"TrustStore"})]})}),e.jsxs("tbody",{className:"bg-white divide-y divide-border",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"用途"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"存储自己的私钥和证书"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"存储信任的CA证书"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"内容"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"私钥 + 证书链"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"CA公钥证书"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"访问权限"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"需要密码保护"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"通常公开可读"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"典型场景"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"HTTPS服务器配置"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"HTTPS客户端验证"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"文件格式"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"JKS / PKCS12"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"JKS / PKCS12 / PEM"})]})]})]})}),e.jsx("h2",{id:"playground",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"代码实验场"}),e.jsx(a,{code:`import java.security.*;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

public class DigitalSignatureExample {
    
    private static final String SIGNATURE_ALGORITHM = "SHA256withRSA";
    
    /**
     * 生成RSA密钥对
     */
    public static KeyPair generateKeyPair() throws Exception {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
        keyPairGenerator.initialize(2048);
        return keyPairGenerator.generateKeyPair();
    }
    
    /**
     * 签名
     */
    public static byte[] sign(String data, PrivateKey privateKey) throws Exception {
        Signature signature = Signature.getInstance(SIGNATURE_ALGORITHM);
        signature.initSign(privateKey);
        signature.update(data.getBytes("UTF-8"));
        return signature.sign();
    }
    
    /**
     * 验签
     */
    public static boolean verify(String data, byte[] signatureBytes, PublicKey publicKey) throws Exception {
        Signature signature = Signature.getInstance(SIGNATURE_ALGORITHM);
        signature.initVerify(publicKey);
        signature.update(data.getBytes("UTF-8"));
        return signature.verify(signatureBytes);
    }
    
    /**
     * 导出公钥为Base64字符串
     */
    public static String exportPublicKey(PublicKey publicKey) {
        return Base64.getEncoder().encodeToString(publicKey.getEncoded());
    }
    
    /**
     * 从Base64字符串导入公钥
     */
    public static PublicKey importPublicKey(String base64PublicKey) throws Exception {
        byte[] keyBytes = Base64.getDecoder().decode(base64PublicKey);
        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        return keyFactory.generatePublic(keySpec);
    }
    
    public static void main(String[] args) throws Exception {
        // 1. 生成密钥对
        KeyPair keyPair = generateKeyPair();
        PrivateKey privateKey = keyPair.getPrivate();
        PublicKey publicKey = keyPair.getPublic();
        
        System.out.println("=== 数字签名示例 ===
");
        
        // 2. 签名
        String originalData = "这是一条重要消息，需要保证完整性和来源可信！";
        byte[] signature = sign(originalData, privateKey);
        
        System.out.println("原文: " + originalData);
        System.out.println("签名(Base64): " + Base64.getEncoder().encodeToString(signature));
        System.out.println("签名长度: " + signature.length + " bytes
");
        
        // 3. 验签（正常情况）
        boolean isValid = verify(originalData, signature, publicKey);
        System.out.println("验签结果（原文未篡改）: " + (isValid ? "✓ 通过" : "✗ 失败"));
        
        // 4. 验签（数据被篡改）
        String tamperedData = "这是一条被篡改的消息！";
        boolean isTamperedValid = verify(tamperedData, signature, publicKey);
        System.out.println("验签结果（数据被篡改）: " + (isTamperedValid ? "✓ 通过" : "✗ 失败"));
        
        // 5. 导出和导入公钥
        String exportedKey = exportPublicKey(publicKey);
        System.out.println("
导出的公钥(Base64): " + exportedKey.substring(0, 50) + "...");
        
        PublicKey importedKey = importPublicKey(exportedKey);
        boolean isImportedValid = verify(originalData, signature, importedKey);
        System.out.println("使用导入的公钥验签: " + (isImportedValid ? "✓ 通过" : "✗ 失败"));
    }
}`,language:"java",description:"数字签名与验签完整示例"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：认为数字签名可以加密数据",children:[e.jsx("p",{className:"text-sm mb-2",children:"❌ 错误认知：数字签名可以保护数据不被窃取"}),e.jsxs("p",{className:"text-sm",children:["✅ 正确理解：数字签名",e.jsx("strong",{children:"不提供机密性"}),"，任何人都可以读取签名后的数据。 签名只保证数据完整性和身份认证。如果需要保密，应该先加密再签名，或先签名再加密。"]})]}),e.jsxs(t,{type:"danger",title:"误区 2：认为证书永不过期",children:[e.jsx("p",{className:"text-sm mb-2",children:"❌ 错误认知：一旦获得证书，就可以永久使用"}),e.jsxs("p",{className:"text-sm",children:["✅ 正确理解：所有证书都有",e.jsx("strong",{children:"有效期"}),"（通常1-2年）。过期后必须重新申请。 此外，证书可能在有效期内被",e.jsx("strong",{children:"吊销"}),"（如私钥泄露），需要通过CRL或OCSP检查吊销状态。"]})]}),e.jsxs(t,{type:"danger",title:"误区 3：忽略证书链验证",children:[e.jsx("p",{className:"text-sm mb-2",children:"❌ 危险做法：只检查服务器证书，不验证整个证书链"}),e.jsxs("p",{className:"text-sm",children:["✅ 正确做法：必须验证",e.jsx("strong",{children:"完整的证书链"}),"：服务器证书 → 中间CA → 根CA。 任何一环失效都会导致安全风险。Java的SSLContext会自动处理证书链验证。"]})]}),e.jsxs(t,{type:"danger",title:"误区 4：私钥保管不当",children:[e.jsx("p",{className:"text-sm mb-2",children:"❌ 危险做法：将私钥硬编码在代码中或提交到Git"}),e.jsxs("p",{className:"text-sm",children:["✅ 正确做法：私钥必须",e.jsx("strong",{children:"严格保密"}),"，存储在安全的KeyStore中，设置强密码保护。 生产环境应使用硬件安全模块（HSM）或云服务商的密钥管理服务（如AWS KMS）。"]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"面试真题"}),e.jsx(c,{questions:[{question:"数字签名的工作原理是什么？它能解决哪些安全问题？",answer:`工作原理：

1. 签名过程（发送方）：
   a. 对原始数据计算哈希（如SHA-256）
   b. 用私钥对哈希值进行加密 → 得到签名
   c. 发送：原始数据 + 签名

2. 验签过程（接收方）：
   a. 对收到的数据计算哈希
   b. 用公钥解密签名 → 得到原始哈希
   c. 对比两个哈希值：一致则验证通过

解决的三大安全问题：

1. 完整性（Integrity）：
   - 数据被篡改后，哈希值会改变，验签失败
   - 确保数据在传输过程中未被修改

2. 身份认证（Authentication）：
   - 只有持有私钥的人才能生成有效签名
   - 接收方可以通过公钥验证发送方身份

3. 不可否认性（Non-repudiation）：
   - 发送方无法否认自己发送过该数据
   - 因为只有他持有私钥

注意：数字签名不提供机密性（Confidentiality），
如果需要保密，应配合加密使用。`},{question:"数字证书的作用是什么？为什么需要CA机构？",answer:`数字证书的作用：

1. 绑定公钥和身份：
   - 证书包含公钥和持有者信息（域名、组织等）
   - 证明"这个公钥属于这个实体"

2. 防止中间人攻击：
   - 如果没有证书，攻击者可以替换公钥
   - 有了证书，攻击者无法伪造CA签名

为什么需要CA机构：

1. 信任锚点（Trust Anchor）：
   - CA是受信任的第三方
   - 浏览器/操作系统内置了根CA证书
   - 用户信任CA，CA信任网站，形成信任链

2. 身份验证：
   - CA在签发证书前会验证申请者身份
   - DV证书：验证域名所有权
   - OV证书：验证组织真实性
   - EV证书：严格验证，显示绿色地址栏

3. 证书管理：
   - 签发证书
   - 吊销证书（私钥泄露时）
   - 维护CRL（证书吊销列表）

总结：CA机构是PKI（公钥基础设施）的核心，
解决了"如何信任一个陌生公钥"的问题。`},{question:"HTTPS是如何使用数字证书的？",answer:`HTTPS使用数字证书的完整流程：

1. 服务器配置：
   - 向CA申请证书（提供域名、组织信息）
   - CA验证身份后签发证书
   - 服务器安装证书和私钥

2. TLS握手阶段：
   a. 客户端发起HTTPS请求
   b. 服务器返回证书（包含公钥）
   c. 客户端验证证书：
      - 检查CA签名是否有效
      - 检查证书是否在有效期内
      - 检查域名是否匹配
      - 检查证书是否被吊销
   d. 验证通过后，客户端生成会话密钥
   e. 用服务器公钥加密会话密钥，发送给服务器
   f. 服务器用私钥解密，得到会话密钥

3. 数据传输阶段：
   - 双方使用会话密钥（AES）加密通信
   - 数字证书仅在握手阶段使用

4. 证书链验证：
   - 服务器证书 → 中间CA证书 → 根CA证书
   - 客户端检查根CA是否在信任列表中

关键点：
- 证书用于身份认证和密钥交换
- 实际数据用对称加密（AES）传输
- 证书验证失败会导致浏览器警告`},{question:"什么是证书链？为什么要设计成链式结构？",answer:`证书链（Certificate Chain）是一系列证书的层级关系：

结构：
根CA证书（Root CA）
  ↓ 签名
中间CA证书（Intermediate CA）
  ↓ 签名
服务器证书（Server Certificate）

为什么要设计成链式结构：

1. 安全性：
   - 根CA私钥离线存储，极少使用
   - 即使中间CA私钥泄露，只需吊销中间CA证书
   - 根CA不受影响，无需更换

2. 灵活性：
   - 一个根CA可以有多个中间CA
   - 不同中间CA可以服务不同业务线
   - 便于管理和隔离风险

3. 信任传递：
   - 客户端只信任根CA
   - 根CA信任中间CA（通过签名）
   - 中间CA信任服务器（通过签名）
   - 形成信任链

4. 吊销效率：
   - 吊销中间CA证书，其下所有证书自动失效
   - 无需逐个吊销服务器证书

验证过程：
1. 客户端收到服务器证书
2. 检查服务器证书是否由中间CA签名
3. 检查中间CA证书是否由根CA签名
4. 检查根CA是否在信任列表中
5. 全部通过 → 信任服务器证书

实际应用：
- 浏览器内置了100+个根CA证书
- 服务器通常发送完整证书链（服务器证书 + 中间CA证书）
- 客户端自动构建和验证证书链`},{question:"KeyStore和TrustStore有什么区别？",answer:`KeyStore和TrustStore都是Java中存储密钥和证书的容器，但用途不同：

KeyStore（密钥库）：
- 用途：存储自己的私钥和证书链
- 内容：私钥 + 对应的公钥证书 + 证书链
- 访问：需要密码保护（敏感信息）
- 场景：
  * HTTPS服务器：存储服务器证书和私钥
  * 客户端认证：存储客户端证书
  * 代码签名：存储签名密钥

TrustStore（信任库）：
- 用途：存储信任的CA证书
- 内容：CA的公钥证书（不需要私钥）
- 访问：通常公开可读（不包含敏感信息）
- 场景：
  * HTTPS客户端：验证服务器证书
  * SSL连接：检查对方证书是否由可信CA签发

配置示例（Tomcat）：
server.xml:
<Connector port="8443" protocol="HTTP/1.1"
    keystoreFile="conf/keystore.jks"
    keystorePass="changeit"
    truststoreFile="conf/truststore.jks"
    truststorePass="changeit" />

默认位置：
- KeyStore：无默认，需手动配置
- TrustStore：$JAVA_HOME/lib/security/cacerts

文件格式：
- JKS（Java KeyStore）：Java专有格式
- PKCS12（.p12/.pfx）：行业标准，推荐使用
- PEM：文本格式，常用于OpenSSL

最佳实践：
1. 使用PKCS12格式（跨平台兼容性好）
2. KeyStore设置强密码
3. 定期更新TrustStore中的CA证书
4. 不要将KeyStore提交到版本控制系统`}]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"对比分析"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"数字签名 vs 消息摘要 vs 加密的对比："}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full divide-y divide-border border border-border rounded-paper-md",children:[e.jsx("thead",{className:"bg-parchment-deep",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"特性"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"数字签名"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"消息摘要"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"加密"})]})}),e.jsxs("tbody",{className:"bg-white divide-y divide-border",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"目的"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"身份认证+完整性"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"完整性校验"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"机密性"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"密钥"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"非对称（公私钥）"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"无密钥"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"对称或非对称"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"可逆性"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"可验证"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"不可逆"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"可解密"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"防篡改"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅"}),e.jsx("td",{className:"px-4 py-3 text-sm text-red-600",children:"❌"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"身份认证"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅"}),e.jsx("td",{className:"px-4 py-3 text-sm text-red-600",children:"❌"}),e.jsx("td",{className:"px-4 py-3 text-sm text-red-600",children:"❌"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"机密性"}),e.jsx("td",{className:"px-4 py-3 text-sm text-red-600",children:"❌"}),e.jsx("td",{className:"px-4 py-3 text-sm text-red-600",children:"❌"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"典型算法"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"RSA-SHA256"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"SHA-256"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"AES/RSA"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-medium text-sm",children:"应用场景"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"HTTPS、代码签名"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"密码存储、文件校验"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"数据加密传输"})]})]})]})}),e.jsxs("section",{id:"related",className:"mb-8",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"关联知识"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"p-4 border border-border rounded-paper-md hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-sm mb-2",children:"→ 加密与解密"}),e.jsx("p",{className:"text-xs text-ink-muted",children:"学习对称加密和非对称加密的基础知识"})]}),e.jsxs("div",{className:"p-4 border border-border rounded-paper-md hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-sm mb-2",children:"→ Spring Security安全框架"}),e.jsx("p",{className:"text-xs text-ink-muted",children:"学习如何在Spring应用中集成HTTPS和证书管理"})]})]})]}),e.jsx(n,{...r(i.category,i.id)})]})}),e.jsx(l,{items:m})]})}export{u as default};
