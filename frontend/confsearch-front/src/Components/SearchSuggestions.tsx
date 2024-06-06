import { Button, Divider, Space } from "antd";
import { useNavigate } from "react-router-dom";

// const suggestion_sets_list: string[][] = [
// 	["?query=SOSP+RTSS+SIGMETRICS+ASPLOS+OSDI+ICSE", "SOSP RTSS SIGMETRICS ASPLOS OSDI ICSE"],
// 	["?query=RTSS+PODC+ICDE+AAMAS+VLDB", "RTSS PODC ICDE AAMAS VLDB"],
// 	["?query=LICS+STOC+FOCS+STACS", "LICS STOC FOCS STACS"],
// 	["?query=IPDPS+SC+ICPP+CCGRID+HPDC", "IPDPS SC ICPP CCGRID HPDC"],
// 	["?query=ACL+ICML+AAAI+KDD+ICLR+NeurIPS", "ACL ICML AAAI KDD ICLR NeurIPS"],
// ];

// const suggestion_similar_conference: string[][] = [
// 	["?query=IPDPS", "International Conference on Parallel Processing"],
// 	["?query=RTSS", "IEEE Real-Time Systems Symposium"],
// 	["?query=STOC", "Symposium on the Theory of Computing"],
// 	["?query=ICML", "International Conference on Machine Learning"],
// 	["?query=ICCV", "IEEE International Conference on Computer Vision"],
// ];

// const keywords_suggestions: string[][] = [
// 	["?query=GANs", "GANs"],
// 	["?query=cryptocurrency+scalability", "smart contracts"],
// 	["?query=Byzantine+Node", "Byzantine Node"],
// 	["?query=visual+descriptors", "Visual Descriptors"],
// 	["?query=Boltzmann+Machine", "Boltzmann Machine"],
// 	["?query=decentralized+finance", "Decentralized Finance"],
// 	["?query=ridge+regression", "Ridge regression"],
// 	["?query=high-performance+computing+regression", "high-performance computing"],
// ];

// const authors_suggestions: string[][] = [
// 	["?query=roger+wattenhofer", "Roger Wattenhofer"],
// 	["?query=timothy+roscoe", "Timothy Roscoe"],
// 	["?query=onur+mutlu", "Onur Mutlu"],
// 	["?query=Torsten+Hoefler", "Torsten Hoefler"],
// 	["?query=Adi+Shamir", "Adi Shamir"],
// 	["?query=Volker+Strassen", "Volker Strassen"],
// 	["?query=Donald+E.+Knuth", "Donald E. Knuth"],
// 	["?query=Lex+Fridman", "Lex Fridman"],
// 	["?query=Tim+Berners-Lee", "Tim Berners-Lee"],
// 	["?query=Leslie+Lamport", "Leslie Lamport"],
// ];

const SearchSuggestions = () => {

	const navigate = useNavigate();

	return (
		<div className="Main_SearchSuggestions">
			<Divider orientation="left" plain={false} style={{ width: "100%", fontSize: "20px" }}>Most popular</Divider>

			<Space direction="vertical" style={{ width: "100%" }}>
				<Space>
					<Button type="primary" size="large" onClick={() => navigate("?query=Donald+E.+Knuth")}>Donald E. Knuth</Button>
					<Button type="primary" size="large" onClick={() => navigate("?query=high-performance+computing+regression")}>high-performance computing</Button>
				</Space>
				<Space>

					<Button type="primary" size="large" onClick={() => navigate("?query=RTSS")}>IEEE Real-Time Systems Symposium</Button>
					<Button type="primary" size="large" onClick={() => navigate("?query=LICS+STOC+FOCS+STACS")}>LICS STOC FOCS STACS</Button>
				</Space>

			</Space>
		</div>
	)
}

export default SearchSuggestions;