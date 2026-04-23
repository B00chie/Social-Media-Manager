function Wireframe() {
  return (
    <div style={{
      background: '#F0F0F0',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px',
      gap: '48px',
      fontFamily: 'Inter, Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '18px', color: '#333', fontWeight: 700 }}>
        Wireframe prikazi — Social Media Manager
      </h1>

      {/* Slika 4 — Concept Layout */}
      <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.10)', padding: '24px' }}>
        <div style={{ fontSize: '13px', color: '#888', marginBottom: '10px', fontStyle: 'italic' }}>
          Slika 4 — Koncept layout aplikacije
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 580" width="900" height="580" fontFamily="Inter, Arial, sans-serif">
          <rect width="900" height="580" fill="#F9F9F9"/>
          <text x="450" y="30" textAnchor="middle" fontSize="14" fontWeight="700" fill="#333">Social Media Manager — Koncept aplikacije</text>
          {/* SIDEBAR */}
          <rect x="40" y="55" width="130" height="480" rx="10" fill="#E0E0E0" stroke="#BDBDBD" strokeWidth="1.5"/>
          <text x="105" y="48" textAnchor="middle" fontSize="10" fill="#888" fontStyle="italic">Sidebar (kolapsibilna)</text>
          <rect x="52" y="67" width="106" height="36" rx="6" fill="#C8C8C8" stroke="#BDBDBD" strokeWidth="1"/>
          <text x="105" y="90" textAnchor="middle" fontSize="11" fontWeight="700" fill="#555">SMM LOGO</text>
          <rect x="52" y="115" width="106" height="28" rx="5" fill="#BDBDBD" stroke="#AAA" strokeWidth="1"/>
          <text x="105" y="133" textAnchor="middle" fontSize="10" fontWeight="600" fill="#333">Dashboard ◀</text>
          <rect x="52" y="151" width="106" height="28" rx="5" fill="none"/>
          <text x="105" y="169" textAnchor="middle" fontSize="10" fill="#777">Feed</text>
          <rect x="52" y="187" width="106" height="28" rx="5" fill="none"/>
          <text x="105" y="205" textAnchor="middle" fontSize="10" fill="#777">Connected</text>
          <rect x="52" y="223" width="106" height="28" rx="5" fill="none"/>
          <text x="105" y="241" textAnchor="middle" fontSize="10" fill="#777">Notifications</text>
          <rect x="52" y="259" width="106" height="28" rx="5" fill="none"/>
          <text x="105" y="277" textAnchor="middle" fontSize="10" fill="#777">Settings</text>
          <line x1="60" y1="460" x2="158" y2="460" stroke="#C0C0C0" strokeWidth="1"/>
          <rect x="52" y="468" width="48" height="24" rx="12" fill="#C8C8C8" stroke="#BDBDBD" strokeWidth="1"/>
          <text x="76" y="484" textAnchor="middle" fontSize="9" fill="#666">☀ ☾</text>
          <circle cx="75" cy="510" r="16" fill="#C0C0C0" stroke="#BDBDBD" strokeWidth="1"/>
          <text x="75" y="514" textAnchor="middle" fontSize="8" fill="#666">USER</text>
          <rect x="98" y="505" width="52" height="10" rx="3" fill="#C8C8C8"/>
          {/* MAIN CONTENT */}
          <rect x="190" y="55" width="630" height="480" rx="10" fill="#EDEDED" stroke="#BDBDBD" strokeWidth="1.5"/>
          <text x="505" y="48" textAnchor="middle" fontSize="10" fill="#888" fontStyle="italic">Glavni sadržaj (menja se po stranici)</text>
          <rect x="206" y="70" width="320" height="34" rx="6" fill="#DCDCDC" stroke="#C8C8C8" strokeWidth="1"/>
          <text x="366" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="#444">Naslov stranice / Pozdravna poruka</text>
          <rect x="546" y="70" width="258" height="34" rx="6" fill="#DCDCDC" stroke="#C8C8C8" strokeWidth="1"/>
          <text x="675" y="92" textAnchor="middle" fontSize="10" fill="#666">Datum i vreme</text>
          {/* Cards */}
          <text x="206" y="128" fontSize="10" fill="#888" fontStyle="italic">2×2 grid — kartice naloga</text>
          <rect x="206" y="136" width="288" height="60" rx="8" fill="#DCDCDC" stroke="#C8C8C8" strokeWidth="1"/>
          <circle cx="232" cy="166" r="16" fill="#C4C4C4" stroke="#BBB" strokeWidth="1"/>
          <text x="232" y="170" textAnchor="middle" fontSize="8" fill="#666">IGR</text>
          <rect x="256" y="157" width="80" height="10" rx="3" fill="#C4C4C4"/>
          <rect x="256" y="173" width="55" height="8" rx="3" fill="#D4D4D4"/>
          <rect x="452" y="160" width="30" height="12" rx="6" fill="#C8E6C9"/>
          <text x="467" y="170" textAnchor="middle" fontSize="7" fill="#388E3C">✓</text>
          <rect x="506" y="136" width="288" height="60" rx="8" fill="#DCDCDC" stroke="#C8C8C8" strokeWidth="1"/>
          <circle cx="532" cy="166" r="16" fill="#C4C4C4" stroke="#BBB" strokeWidth="1"/>
          <text x="532" y="170" textAnchor="middle" fontSize="8" fill="#666">GIT</text>
          <rect x="556" y="157" width="70" height="10" rx="3" fill="#C4C4C4"/>
          <rect x="556" y="173" width="50" height="8" rx="3" fill="#D4D4D4"/>
          <rect x="206" y="206" width="288" height="60" rx="8" fill="#DCDCDC" stroke="#C8C8C8" strokeWidth="1"/>
          <circle cx="232" cy="236" r="16" fill="#C4C4C4" stroke="#BBB" strokeWidth="1"/>
          <text x="232" y="240" textAnchor="middle" fontSize="8" fill="#666">SPT</text>
          <rect x="256" y="227" width="65" height="10" rx="3" fill="#C4C4C4"/>
          <rect x="256" y="243" width="45" height="8" rx="3" fill="#D4D4D4"/>
          <rect x="506" y="206" width="288" height="60" rx="8" fill="#DCDCDC" stroke="#C8C8C8" strokeWidth="1"/>
          <circle cx="532" cy="236" r="16" fill="#C4C4C4" stroke="#BBB" strokeWidth="1"/>
          <text x="532" y="240" textAnchor="middle" fontSize="8" fill="#666">STM</text>
          <rect x="556" y="227" width="60" height="10" rx="3" fill="#C4C4C4"/>
          <rect x="556" y="243" width="80" height="8" rx="3" fill="#D4D4D4"/>
          {/* Stats */}
          <text x="206" y="285" fontSize="10" fill="#888" fontStyle="italic">Stats — 3 kartice</text>
          <rect x="206" y="293" width="185" height="48" rx="8" fill="#DCDCDC" stroke="#C8C8C8" strokeWidth="1"/>
          <text x="298" y="322" textAnchor="middle" fontSize="10" fill="#666">Povezanih mreža</text>
          <rect x="401" y="293" width="185" height="48" rx="8" fill="#DCDCDC" stroke="#C8C8C8" strokeWidth="1"/>
          <text x="493" y="322" textAnchor="middle" fontSize="10" fill="#666">Notifikacije</text>
          <rect x="596" y="293" width="198" height="48" rx="8" fill="#DCDCDC" stroke="#C8C8C8" strokeWidth="1"/>
          <text x="695" y="322" textAnchor="middle" fontSize="10" fill="#666">Aktivni nalozi</text>
          {/* Recent Activity */}
          <text x="206" y="360" fontSize="12" fontWeight="700" fill="#555">Recent Activity</text>
          <rect x="206" y="370" width="588" height="38" rx="6" fill="#DCDCDC" stroke="#C8C8C8" strokeWidth="1"/>
          <circle cx="228" cy="389" r="12" fill="#C4C4C4"/>
          <rect x="250" y="382" width="200" height="10" rx="3" fill="#C4C4C4"/>
          <rect x="700" y="382" width="76" height="10" rx="3" fill="#C4C4C4"/>
          <rect x="206" y="416" width="588" height="38" rx="6" fill="#DCDCDC" stroke="#C8C8C8" strokeWidth="1"/>
          <circle cx="228" cy="435" r="12" fill="#C4C4C4"/>
          <rect x="250" y="428" width="160" height="10" rx="3" fill="#C4C4C4"/>
          <rect x="700" y="428" width="76" height="10" rx="3" fill="#C4C4C4"/>
          <rect x="206" y="462" width="588" height="38" rx="6" fill="#DCDCDC" stroke="#C8C8C8" strokeWidth="1"/>
          <circle cx="228" cy="481" r="12" fill="#C4C4C4"/>
          <rect x="250" y="474" width="180" height="10" rx="3" fill="#C4C4C4"/>
          <rect x="700" y="474" width="76" height="10" rx="3" fill="#C4C4C4"/>
          {/* Spotify */}
          <rect x="530" y="495" width="280" height="30" rx="8" fill="#D4D4D4" stroke="#BDBDBD" strokeWidth="1.5" strokeDasharray="4,2"/>
          <text x="670" y="514" textAnchor="middle" fontSize="10" fill="#666">🎵  SpotifyPlayer (plutajući widget)</text>
          {/* Annotations */}
          <text x="105" y="558" textAnchor="middle" fontSize="9" fill="#888">72px / 240px</text>
          <text x="505" y="558" textAnchor="middle" fontSize="9" fill="#888">Sadržaj stranice — flex: 1, overflow scroll</text>
          <text x="450" y="575" textAnchor="middle" fontSize="9" fill="#AAA">Slika 4 — Koncept layout aplikacije Social Media Manager</text>
          <rect x="0.5" y="0.5" width="899" height="579" fill="none" stroke="#D0D0D0" strokeWidth="1"/>
        </svg>
      </div>

      {/* Slika 10 — Dashboard Wireframe */}
      <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.10)', padding: '24px' }}>
        <div style={{ fontSize: '13px', color: '#888', marginBottom: '10px', fontStyle: 'italic' }}>
          Slika 10 — Wireframe Dashboard stranice
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 820" width="960" height="656" fontFamily="Inter, Arial, sans-serif">
          <rect width="1200" height="820" fill="#F9F9F9"/>
          {/* SIDEBAR */}
          <rect x="0" y="0" width="200" height="820" fill="#E8E8E8" stroke="#BDBDBD" strokeWidth="1"/>
          <rect x="16" y="16" width="168" height="52" rx="8" fill="#D0D0D0" stroke="#BDBDBD" strokeWidth="1"/>
          <text x="100" y="47" textAnchor="middle" fontSize="13" fontWeight="700" fill="#555">LOGO / SMM</text>
          <rect x="10" y="94" width="180" height="38" rx="6" fill="#C8C8C8" stroke="#AAAAAA" strokeWidth="1"/>
          <rect x="22" y="107" width="16" height="14" rx="2" fill="#999"/>
          <text x="46" y="118" fontSize="13" fontWeight="600" fill="#333">Dashboard</text>
          <rect x="178" y="94" width="3" height="38" rx="1" fill="#555"/>
          <rect x="10" y="140" width="180" height="38" rx="6" fill="none"/>
          <rect x="22" y="153" width="16" height="14" rx="2" fill="#BBB"/>
          <text x="46" y="164" fontSize="13" fill="#777">Feed</text>
          <rect x="10" y="186" width="180" height="38" rx="6" fill="none"/>
          <rect x="22" y="199" width="16" height="14" rx="2" fill="#BBB"/>
          <text x="46" y="210" fontSize="13" fill="#777">Connected</text>
          <rect x="10" y="232" width="180" height="38" rx="6" fill="none"/>
          <rect x="22" y="245" width="16" height="14" rx="2" fill="#BBB"/>
          <text x="46" y="256" fontSize="13" fill="#777">Notifications</text>
          <line x1="16" y1="690" x2="184" y2="690" stroke="#C8C8C8" strokeWidth="1"/>
          <rect x="10" y="700" width="180" height="32" rx="6" fill="#D8D8D8" stroke="#C0C0C0" strokeWidth="1"/>
          <text x="100" y="720" textAnchor="middle" fontSize="11" fill="#666">Export your stats  ⓘ</text>
          <circle cx="32" cy="754" r="12" fill="#D0D0D0" stroke="#BDBDBD" strokeWidth="1"/>
          <circle cx="62" cy="754" r="12" fill="#D0D0D0" stroke="#BDBDBD" strokeWidth="1"/>
          <circle cx="28" cy="796" r="14" fill="#C8C8C8" stroke="#BDBDBD" strokeWidth="1"/>
          <text x="28" y="800" textAnchor="middle" fontSize="9" fill="#555">AV</text>
          <text x="50" y="793" fontSize="12" fontWeight="600" fill="#444">Uroš Kostić</text>
          <text x="50" y="807" fontSize="10" fill="#888">@username</text>
          {/* MAIN CONTENT */}
          <rect x="200" y="0" width="1000" height="820" fill="#F5F5F5"/>
          <rect x="240" y="28" width="340" height="36" rx="6" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="1"/>
          <text x="410" y="51" textAnchor="middle" fontSize="13" fontWeight="700" fill="#444">Dobrodošao nazad, [username] 👋</text>
          <rect x="870" y="28" width="290" height="36" rx="6" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="1"/>
          <text x="1015" y="51" textAnchor="middle" fontSize="13" fill="#666">Sreda, 11. Mart 2026.</text>
          {/* Account Cards */}
          <rect x="240" y="90" width="450" height="68" rx="10" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="1"/>
          <circle cx="274" cy="124" r="18" fill="#C8C8C8" stroke="#BDBDBD" strokeWidth="1"/>
          <text x="274" y="128" textAnchor="middle" fontSize="9" fill="#777">IGR</text>
          <rect x="302" y="110" width="90" height="12" rx="3" fill="#C8C8C8"/>
          <rect x="302" y="128" width="70" height="10" rx="3" fill="#D4D4D4"/>
          <rect x="600" y="115" width="72" height="20" rx="10" fill="#C8E6C9" stroke="#A5D6A7" strokeWidth="1"/>
          <text x="636" y="129" textAnchor="middle" fontSize="10" fill="#388E3C" fontWeight="600">Connected</text>
          <rect x="710" y="90" width="450" height="68" rx="10" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="1"/>
          <circle cx="744" cy="124" r="18" fill="#C8C8C8" stroke="#BDBDBD" strokeWidth="1"/>
          <text x="744" y="128" textAnchor="middle" fontSize="9" fill="#777">GIT</text>
          <rect x="772" y="110" width="80" height="12" rx="3" fill="#C8C8C8"/>
          <rect x="772" y="128" width="60" height="10" rx="3" fill="#D4D4D4"/>
          <rect x="1072" y="115" width="72" height="20" rx="10" fill="#C8E6C9" stroke="#A5D6A7" strokeWidth="1"/>
          <text x="1108" y="129" textAnchor="middle" fontSize="10" fill="#388E3C" fontWeight="600">Connected</text>
          <rect x="240" y="168" width="450" height="68" rx="10" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="1"/>
          <circle cx="274" cy="202" r="18" fill="#C8C8C8" stroke="#BDBDBD" strokeWidth="1"/>
          <text x="274" y="206" textAnchor="middle" fontSize="9" fill="#777">SPT</text>
          <rect x="302" y="188" width="75" height="12" rx="3" fill="#C8C8C8"/>
          <rect x="302" y="206" width="55" height="10" rx="3" fill="#D4D4D4"/>
          <rect x="600" y="193" width="72" height="20" rx="10" fill="#C8E6C9" stroke="#A5D6A7" strokeWidth="1"/>
          <text x="636" y="207" textAnchor="middle" fontSize="10" fill="#388E3C" fontWeight="600">Connected</text>
          <rect x="710" y="168" width="450" height="68" rx="10" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="1"/>
          <circle cx="744" cy="202" r="18" fill="#C8C8C8" stroke="#BDBDBD" strokeWidth="1"/>
          <text x="744" y="206" textAnchor="middle" fontSize="9" fill="#777">STM</text>
          <rect x="772" y="188" width="65" height="12" rx="3" fill="#C8C8C8"/>
          <rect x="772" y="206" width="50" height="10" rx="3" fill="#D4D4D4"/>
          <rect x="1048" y="193" width="96" height="20" rx="10" fill="#EEEEEE" stroke="#D0D0D0" strokeWidth="1"/>
          <text x="1096" y="207" textAnchor="middle" fontSize="10" fill="#999">Disconnected</text>
          {/* Stats */}
          <rect x="240" y="256" width="296" height="60" rx="10" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="1"/>
          <text x="288" y="291" fontSize="12" fill="#666">Povezanih mreža</text>
          <text x="516" y="291" textAnchor="end" fontSize="18" fontWeight="700" fill="#444">4</text>
          <rect x="546" y="256" width="296" height="60" rx="10" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="1"/>
          <text x="590" y="291" fontSize="12" fill="#666">Notifikacije</text>
          <text x="822" y="291" textAnchor="end" fontSize="18" fontWeight="700" fill="#444">12</text>
          <rect x="852" y="256" width="308" height="60" rx="10" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="1"/>
          <text x="894" y="291" fontSize="12" fill="#666">Aktivni nalozi</text>
          <text x="1140" y="291" textAnchor="end" fontSize="18" fontWeight="700" fill="#444">3</text>
          {/* Recent Activity */}
          <text x="240" y="354" fontSize="16" fontWeight="700" fill="#444">Recent activity</text>
          <rect x="240" y="368" width="920" height="52" rx="10" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="1"/>
          <circle cx="270" cy="394" r="16" fill="#C8C8C8" stroke="#BDBDBD" strokeWidth="1"/>
          <text x="270" y="398" textAnchor="middle" fontSize="8" fill="#777">IGR</text>
          <rect x="298" y="386" width="260" height="12" rx="3" fill="#C8C8C8"/>
          <rect x="1080" y="386" width="72" height="12" rx="3" fill="#D0D0D0"/>
          <rect x="240" y="430" width="920" height="52" rx="10" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="1"/>
          <circle cx="270" cy="456" r="16" fill="#C8C8C8" stroke="#BDBDBD" strokeWidth="1"/>
          <text x="270" y="460" textAnchor="middle" fontSize="8" fill="#777">GIT</text>
          <rect x="298" y="448" width="220" height="12" rx="3" fill="#C8C8C8"/>
          <rect x="1080" y="448" width="72" height="12" rx="3" fill="#D0D0D0"/>
          <rect x="240" y="492" width="920" height="52" rx="10" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="1"/>
          <circle cx="270" cy="518" r="16" fill="#C8C8C8" stroke="#BDBDBD" strokeWidth="1"/>
          <text x="270" y="522" textAnchor="middle" fontSize="8" fill="#777">IGR</text>
          <rect x="298" y="510" width="240" height="12" rx="3" fill="#C8C8C8"/>
          <rect x="1080" y="510" width="72" height="12" rx="3" fill="#D0D0D0"/>
          <rect x="240" y="554" width="920" height="52" rx="10" fill="#E0E0E0" stroke="#C8C8C8" strokeWidth="1"/>
          <circle cx="270" cy="580" r="16" fill="#C8C8C8" stroke="#BDBDBD" strokeWidth="1"/>
          <text x="270" y="584" textAnchor="middle" fontSize="8" fill="#777">GIT</text>
          <rect x="298" y="572" width="280" height="12" rx="3" fill="#C8C8C8"/>
          <rect x="1080" y="572" width="72" height="12" rx="3" fill="#D0D0D0"/>
          {/* Spotify Player */}
          <rect x="620" y="748" width="560" height="58" rx="12" fill="#DCDCDC" stroke="#BDBDBD" strokeWidth="1"/>
          <rect x="636" y="754" width="528" height="6" rx="3" fill="#C0C0C0"/>
          <rect x="636" y="754" width="200" height="6" rx="3" fill="#999"/>
          <circle cx="836" cy="757" r="5" fill="#777"/>
          <circle cx="658" cy="785" r="12" fill="#C0C0C0" stroke="#BDBDBD" strokeWidth="1"/>
          <text x="658" y="789" textAnchor="middle" fontSize="7" fill="#777">SPT</text>
          <rect x="678" y="777" width="110" height="10" rx="3" fill="#C8C8C8"/>
          <rect x="678" y="791" width="80" height="8" rx="3" fill="#D4D4D4"/>
          <text x="1090" y="789" fontSize="18" fill="#888">⏮  ▶  ⏭</text>
          {/* Annotations */}
          <rect x="2" y="280" width="10" height="60" rx="3" fill="#888"/>
          <text x="580" y="76" textAnchor="middle" fontSize="10" fill="#888" fontStyle="italic">2×2 Account Cards Grid</text>
          <text x="700" y="252" textAnchor="middle" fontSize="10" fill="#888" fontStyle="italic">Stats Row — 3 cards</text>
          <text x="1060" y="354" fontSize="10" fill="#888" fontStyle="italic">4 activity items</text>
          <text x="900" y="744" textAnchor="middle" fontSize="10" fill="#888" fontStyle="italic">Spotify Player (fixed, bottom-right)</text>
          <rect x="0.5" y="0.5" width="1199" height="819" fill="none" stroke="#BDBDBD" strokeWidth="1"/>
          <line x1="200" y1="0" x2="200" y2="820" stroke="#BDBDBD" strokeWidth="1.5"/>
        </svg>
      </div>
    </div>
  )
}

export default Wireframe
